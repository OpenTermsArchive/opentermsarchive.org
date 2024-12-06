const fs = require('fs');
const path = require('path');

const COLLECTIONS_LIST_PATH = path.join(__dirname, '../data/collections-list.json');
const COLLECTIONS_PATH = path.join(__dirname, '../data/collections.json');

async function fetchCollections() {
  try {
    const collectionsList = JSON.parse(fs.readFileSync(COLLECTIONS_LIST_PATH, 'utf8'));

    const collections = await Promise.allSettled(collectionsList.map(async collection => {
      try {
        const metadataEndpoint = `${collection.endpoint}/metadata`;
        const response = await fetch(metadataEndpoint, { timeout: 5000, referrer: 'https://opentermsarchive.org' });

        if (!response.ok) {
          console.warn(`❌ Failed to fetch ${collection.name}: ${response.status}`);

          return null;
        }

        const data = await response.json();

        console.log(`✅ Successfully fetched ${collection.name}`);

        return { ...data, endpoint: collection.endpoint };
      } catch (error) {
        console.warn(`❌ Failed to fetch ${collection.name} with the following error message: ${error.message}`);

        return null;
      }
    }));

    const validCollections = collections
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.value);

    fs.writeFileSync(COLLECTIONS_PATH, JSON.stringify(validCollections, null, 2));

    console.log(`→ ${validCollections.length}/${collectionsList.length} collections successfully written to ${COLLECTIONS_PATH}`);
  } catch (error) {
    console.error('❌ Failed to fetch collections', error);
    process.exit(1);
  }
}

fetchCollections();
