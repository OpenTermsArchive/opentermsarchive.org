const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const STAFF_PATH = path.join(__dirname, '../data/staff.yaml');
const CONTRIBUTORS_LOCAL_SOURCE = path.join(__dirname, '../.all-contributorsrc');
const COLLECTIONS_PATH = path.join(__dirname, '../data/collections.json');
const PARAMS_PATH = path.join(__dirname, '../config/_default/params.yaml');
const CONTRIBUTORS_OUTPUT_PATH = path.join(__dirname, '../data/contributors.json');

async function fetchContributors() {
  try {
    // Load staff data
    const staffYaml = fs.readFileSync(STAFF_PATH, 'utf8');
    const staff = yaml.load(staffYaml);

    // Build staff names by type (lowercase)
    const staffNamesLowerByType = {};
    for (const [staffType, staffMembers] of Object.entries(staff)) {
      staffNamesLowerByType[staffType] = staffMembers.map(name => name.toLowerCase());
    }

    // Load local contributors source
    const localContributorsData = JSON.parse(fs.readFileSync(CONTRIBUTORS_LOCAL_SOURCE, 'utf8'));
    const contributors = {};

    // Process local contributors
    for (const contributor of localContributorsData.contributors) {
      const contributorNameLower = contributor.name.toLowerCase();
      const contributorData = {
        ...contributor,
        staff: null,
      };

      // Check if contributor is staff
      for (const [staffType, staffNamesLower] of Object.entries(staffNamesLowerByType)) {
        if (staffNamesLower.includes(contributorNameLower)) {
          contributorData.staff = staffType;
          break;
        }
      }

      contributors[contributorNameLower] = contributorData;
    }

    // Load params to get additional sources
    const paramsYaml = fs.readFileSync(PARAMS_PATH, 'utf8');
    const params = yaml.load(paramsYaml);
    let additionalSources = [...(params.contributors.additional_sources || [])];

    // Load collections and add their .all-contributorsrc paths
    if (!fs.existsSync(COLLECTIONS_PATH)) {
      console.error('❌ collections.json not found. Please run "npm run fetch:collections" first.');
      process.exit(1);
    }
    const collections = JSON.parse(fs.readFileSync(COLLECTIONS_PATH, 'utf8'));
    for (const collection of collections) {
      if (collection.declarations) {
        const declarationsPath = collection.declarations
          .replace('https://github.com', 'https://raw.githubusercontent.com')
          .replace(/\/$/, '') + '/main/.all-contributorsrc';
        additionalSources.push(declarationsPath);
      }
    }

    // Fetch additional sources
    const fetchResults = await Promise.allSettled(
      additionalSources.map(async (source) => {
        try {
          const response = await fetch(source, {
            timeout: 5000,
            referrer: 'https://opentermsarchive.org',
          });

          if (!response.ok) {
            console.warn(`❌ Failed to fetch contributors from ${source}: ${response.status}`);
            return null;
          }

          const data = await response.json();
          console.log(`✅ Successfully fetched contributors from ${source}`);
          return { source, data };
        } catch (error) {
          console.warn(`❌ Failed to fetch contributors from ${source}: ${error.message}`);
          return null;
        }
      })
    );

    // Process additional sources
    for (const result of fetchResults) {
      if (result.status === 'fulfilled' && result.value) {
        const { source, data } = result.value;
        const repository = (data.projectName || '').toLowerCase();

        for (const contributor of data.contributors || []) {
          const contributorNameLower = contributor.name.toLowerCase();
          let contributorData = {
            repositories: [repository],
            avatar_url: contributor.avatar_url,
            contributions: contributor.contributions,
            login: contributor.login,
            name: contributor.name,
            profile: contributor.profile,
            staff: null,
          };

          // Merge with existing contributor if exists
          if (contributors[contributorNameLower]) {
            const existingContributor = contributors[contributorNameLower];
            // Merge repositories (unique)
            const existingRepos = existingContributor.repositories || [];
            const mergedRepositories = [
              ...new Set([...existingRepos, ...contributorData.repositories]),
            ];
            // Preserve other existing data
            contributorData = {
              ...existingContributor,
              ...contributorData,
              repositories: mergedRepositories,
            };
          }

          // Check if contributor is staff
          for (const [staffType, staffNamesLower] of Object.entries(staffNamesLowerByType)) {
            if (staffNamesLower.includes(contributorNameLower)) {
              contributorData.staff = staffType;
              break;
            }
          }

          contributors[contributorNameLower] = contributorData;
        }
      }
    }

    // Write output
    fs.writeFileSync(CONTRIBUTORS_OUTPUT_PATH, JSON.stringify(contributors, null, 2));
    console.log(`✅ Successfully written ${Object.keys(contributors).length} contributors to ${CONTRIBUTORS_OUTPUT_PATH}`);
  } catch (error) {
    console.error('❌ Failed to fetch contributors', error);
    process.exit(1);
  }
}

fetchContributors();

