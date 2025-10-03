const fs = require('fs');
const path = require('path');

/**
 * Fetch collections from a list of endpoints and save to a JSON file
 * @param {string} collectionsListPath - Path to the collections list JSON file
 * @param {string} collectionsPath - Path to save the fetched collections JSON file
 * @param {string} type - Type of collections (for logging purposes)
 */
async function fetchCollections(collectionsListPath, collectionsPath, type = 'collections') {
  try {
    const collectionsList = JSON.parse(fs.readFileSync(collectionsListPath, 'utf8'));

    const collections = await Promise.allSettled(collectionsList.map(async collection => {
      try {
        const metadataEndpoint = new URL('metadata', collection.endpoint).href;
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

    fs.writeFileSync(collectionsPath, JSON.stringify(validCollections, null, 2));

    console.log(`→ ${validCollections.length}/${collectionsList.length} ${type} successfully written to ${collectionsPath}`);
  } catch (error) {
    console.error(`❌ Failed to fetch ${type}`, error);
    process.exit(1);
  }
}

module.exports = { fetchCollections };
