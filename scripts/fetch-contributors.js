const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const STAFF_PATH = path.join(__dirname, '../data/staff.yaml');
const CONTRIBUTORS_LOCAL_SOURCE = path.join(__dirname, '../.all-contributorsrc');
const COLLECTIONS_PATH = path.join(__dirname, '../data/collections.json');
const PARAMS_PATH = path.join(__dirname, '../config/_default/params.yaml');
const CONTRIBUTORS_OUTPUT_PATH = path.join(__dirname, '../data/contributors.json');

function checkFileExists(filePath, errorMessage) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${errorMessage}`);
    process.exit(1);
  }
}

function findStaffType(contributorNameLower, staffNamesLowerByType) {
  for (const [staffType, staffNamesLower] of Object.entries(staffNamesLowerByType)) {
    if (staffNamesLower.has(contributorNameLower)) {
      return staffType;
    }
  }
  return null;
}

async function fetchContributors() {
  try {
    checkFileExists(STAFF_PATH, `${STAFF_PATH} not found.`);
    checkFileExists(CONTRIBUTORS_LOCAL_SOURCE, `${CONTRIBUTORS_LOCAL_SOURCE} not found.`);
    checkFileExists(PARAMS_PATH, `${PARAMS_PATH} not found.`);
    checkFileExists(COLLECTIONS_PATH, 'collections.json not found. Please run "npm run fetch:collections" first.');

    const staffYaml = fs.readFileSync(STAFF_PATH, 'utf8');
    const staff = yaml.load(staffYaml);

    const staffNamesLowerByType = {};
    for (const [staffType, staffMembers] of Object.entries(staff)) {
      staffNamesLowerByType[staffType] = new Set(staffMembers.map(name => name.toLowerCase()));
    }

    const localContributorsData = JSON.parse(fs.readFileSync(CONTRIBUTORS_LOCAL_SOURCE, 'utf8'));
    const contributors = {};

    for (const contributor of localContributorsData.contributors) {
      const contributorNameLower = contributor.name.toLowerCase();
      contributors[contributorNameLower] = {
        ...contributor,
        staff: findStaffType(contributorNameLower, staffNamesLowerByType),
      };
    }

    const paramsYaml = fs.readFileSync(PARAMS_PATH, 'utf8');
    const params = yaml.load(paramsYaml);

    const collections = JSON.parse(fs.readFileSync(COLLECTIONS_PATH, 'utf8'));
    const allSources = new Set(params.contributors.additional_sources || []);
    for (const collection of collections) {
      if (collection.declarations) {
        const declarationsPath = collection.declarations
          .replace('https://github.com', 'https://raw.githubusercontent.com')
          .replace(/\/$/, '') + '/main/.all-contributorsrc';
        allSources.add(declarationsPath);
      }
    }

    const fetchResults = await Promise.allSettled(
      Array.from(allSources).map(async (source) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        try {
          const response = await fetch(source, {
            signal: controller.signal,
            referrer: 'https://opentermsarchive.org',
          });
          clearTimeout(timeoutId);

          if (!response.ok) {
            console.warn(`❌ Failed to fetch contributors from ${source}: ${response.status}`);
            return null;
          }

          const data = await response.json();
          console.log(`✅ Successfully fetched contributors from ${source}`);
          return { source, data };
        } catch (error) {
          clearTimeout(timeoutId);
          const errorMessage = error.name === 'AbortError'
            ? 'timeout after 5s'
            : error.message;
          console.warn(`❌ Failed to fetch contributors from ${source}: ${errorMessage}`);
          return null;
        }
      })
    );

    for (const result of fetchResults) {
      if (result.status === 'fulfilled' && result.value) {
        const { data } = result.value;
        const repository = (data.projectName || '').toLowerCase();

        for (const contributor of data.contributors || []) {
          const contributorNameLower = contributor.name.toLowerCase();
          const existingContributor = contributors[contributorNameLower];
          const existingRepos = existingContributor?.repositories || [];

          const staffType = findStaffType(contributorNameLower, staffNamesLowerByType);
          contributors[contributorNameLower] = {
            ...existingContributor,
            ...contributor,
            repositories: [...new Set([...existingRepos, repository])],
            staff: staffType ?? existingContributor?.staff ?? null,
          };
        }
      }
    }

    fs.writeFileSync(CONTRIBUTORS_OUTPUT_PATH, JSON.stringify(contributors, null, 2));
    console.log(`✅ Successfully written ${Object.keys(contributors).length} contributors to ${CONTRIBUTORS_OUTPUT_PATH}`);
  } catch (error) {
    console.error('❌ Failed to fetch contributors', error);
    process.exit(1);
  }
}

fetchContributors();

