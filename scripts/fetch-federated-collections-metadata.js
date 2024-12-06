const fs = require('fs');
const path = require('path');

const FEDERATED_COLLECTION_LIST_FILE = 'federated-collections-list.json';
const FEDERATED_COLLECTION_LIST_PATH = path.join(__dirname, `../data/${FEDERATED_COLLECTION_LIST_FILE}`);
const FEDERATED_COLLECTIONS_METADATA_FILE = 'federated-collections-metadata.json';
const FEDERATED_COLLECTIONS_METADATA_PATH = path.join(__dirname, `../data/${FEDERATED_COLLECTIONS_METADATA_FILE}`);

async function fetchFederatedCollectionsMetadata() {
  try {
    const federatedCollectionsList = JSON.parse(fs.readFileSync(FEDERATED_COLLECTION_LIST_PATH, 'utf8'));

    const federatedCollectionsMetadata = await Promise.allSettled(federatedCollectionsList.map(async collection => {
      try {
        const response = await fetch(collection.endpoint, { timeout: 5000, referrer: 'https://opentermsarchive.org' });

        if (!response.ok) {
          console.warn(`❌ Failed to fetch ${collection.name}: ${response.status}`);

          return null;
        }

        const data = await response.json();

        console.log(`✅ Successfully fetched metadata for ${collection.name}`);

        return { ...data };
      } catch (error) {
        console.warn(`❌ Failed to fetch metadata for ${collection.name} with the following error message: ${error.message}`);

        return null;
      }
    }));

    const validFederatedCollectionsMetadata = federatedCollectionsMetadata
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.value);

    fs.writeFileSync(FEDERATED_COLLECTIONS_METADATA_PATH, JSON.stringify(validFederatedCollectionsMetadata, null, 2));

    console.log(`→ ${validFederatedCollectionsMetadata.length}/${federatedCollectionsList.length} federated collections metadata successfully written to ${FEDERATED_COLLECTIONS_METADATA_PATH}`);
  } catch (error) {
    console.error('❌ Failed to fetch federated collections metadata', error);
    process.exit(1);
  }
}

fetchFederatedCollectionsMetadata();
