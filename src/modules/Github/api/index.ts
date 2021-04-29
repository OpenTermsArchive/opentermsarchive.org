const DOCUMENT_TYPES_URL =
  'https://raw.githubusercontent.com/ambanum/OpenTermsArchive/master/scripts/rewrite/renamer/rules/documentTypes.json';

import axios from 'axios';

export const getDocumentTypes: any = async () => {
  try {
    const { data: documentTypes } = await axios.get(DOCUMENT_TYPES_URL);
    return [...new Set(Object.values(documentTypes))].sort();
  } catch (e) {
    console.error(e);
    return [];
  }
};
