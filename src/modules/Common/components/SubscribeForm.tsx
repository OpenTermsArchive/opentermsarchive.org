import React from 'react';
import { useTranslation } from 'next-i18next';

const SubscribeForm = () => {
  const { t } = useTranslation('common');

  return <>{t('common:subscribe_form', 'Subscribe form')}</>;
};

export default SubscribeForm;
