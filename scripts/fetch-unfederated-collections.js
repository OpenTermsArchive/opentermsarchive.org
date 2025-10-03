const path = require('path');

const { fetchCollections } = require('./fetch-collections-utils.js');

const COLLECTIONS_LIST_PATH = path.join(__dirname, '../data/unfederated-collections-list.json');
const COLLECTIONS_PATH = path.join(__dirname, '../data/unfederated_collections.json');

fetchCollections(COLLECTIONS_LIST_PATH, COLLECTIONS_PATH, 'unfederated collections');
