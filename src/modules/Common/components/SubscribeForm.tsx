import React from 'react';
import SelectService from 'modules/OTA-api/data-components/SelectService';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
export interface SubscribeFormFields {
  email: string;
  consent: boolean;
  service: string;
  documentType: string;
}

export interface SubscribeFormProps {
  loading: boolean;
  onSubmit: (data: SubscribeFormFields) => any;
}

const SubscribeForm = ({ onSubmit, loading = false }: SubscribeFormProps) => {
  const { t } = useTranslation('common');

  const { register, handleSubmit, watch } = useForm<SubscribeFormFields>({
    reValidateMode: 'onChange',
  });

  const { consent, service } = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectService
        service={service}
        serviceProps={register('service', { required: true })}
        documentTypeProps={register('documentType', { required: true })}
      />
      <input
        type="email"
        placeholder={t('form.email', 'Email')}
        {...register('email', { required: true })}
      />
      <input {...register('consent', { required: true })} type="checkbox" />

      <input
        type="submit"
        disabled={!consent || loading}
        value={loading ? '...' : `${t('form:subscribe', 'Subscribe')}`}
      />
    </form>
  );
};

export default SubscribeForm;
