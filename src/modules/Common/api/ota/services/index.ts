import axios from 'axios';

export const getServices = async () => {
  const { data } = await axios(
    'https://disinfo.quaidorsay.fr/api/open-terms-archive/list_services/v1/?multiple_versions_only=false'
  );

  return data;
};
