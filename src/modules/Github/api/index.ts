const DOCUMENT_TYPES_URL =
  'https://raw.githubusercontent.com/ambanum/OpenTermsArchive/master/src/app/types.json';

import axios from 'axios';

export const getDocumentTypes: any = async () => {
  try {
    const { data: documentTypes } = await axios.get(DOCUMENT_TYPES_URL);
    return [...new Set(Object.keys(documentTypes))].sort();
  } catch (e) {
    console.error(e);
    return [];
  }
};
