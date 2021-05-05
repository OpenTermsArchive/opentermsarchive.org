import React from 'react';
import { init } from '@socialgouv/matomo-next';

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL || '';
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '';

const MatomoAnalytics = () => {
  React.useEffect(() => {
    if (MATOMO_URL && MATOMO_SITE_ID) {
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
    } else {
      console.warn(
        '📈 Analytics for Matomo could not be setup, missing NEXT_PUBLIC_MATOMO_URL and NEXT_PUBLIC_MATOMO_SITE_ID'
      );
    }
  }, []);
  return null;
};

export default MatomoAnalytics;
