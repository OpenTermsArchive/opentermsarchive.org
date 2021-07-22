import React from 'react';
import SelectService from 'modules/OTA-api/data-components/SelectService';
import classNames from 'classnames';
import sButton from './Button.module.css';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

export interface SubscribeFormFields {
  email: string;
  consent: boolean;
  service: string;
  documentType: string;
  defaultServices: any;
}

export interface SubscribeFormProps {
  loading: boolean;
  defaultValues: Partial<SubscribeFormFields>;
  defaultServices: any;
  onSubmit: (data: SubscribeFormFields) => any;
  onChange: (data: Partial<{ service: string; documentType: string }>) => any;
}

const SubscribeForm = ({
  onSubmit,
  onChange,
  loading = false,
  defaultValues,
  defaultServices,
}: SubscribeFormProps) => {
  const { t } = useTranslation('common');

  const { register, handleSubmit, watch } = useForm<SubscribeFormFields>({
    reValidateMode: 'onChange',
    defaultValues,
  });

  const { consent, service, documentType } = watch();

  React.useEffect(() => {
    onChange({ service, documentType });
  }, [service, documentType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectService
        defaultServices={defaultServices}
        service={service}
        documentType={documentType}
        serviceProps={register('service', { required: true })}
        documentTypeProps={register('documentType', { required: true })}
      />
      <div className={classNames('formfield')}>
        <label htmlFor="email">
          {t('common:subscribe_form.fields.email.label', 'Fill your email')}
        </label>
        <input
          id="email"
          type="email"
          placeholder={t('common:subscribe_form.fields.email.input.placeholder', 'Email')}
          {...register('email', { required: true })}
        />
      </div>
      <div className={classNames('formfield', 'formfield__flex')}>
        <input id="consent" {...register('consent', { required: true })} type="checkbox" />
        <label htmlFor="consent">
          {t(
            'common:subscribe_form.consent',
            'Check to agree to receive emails informing you of changes to a document.'
          )}
        </label>
      </div>
      <div className={classNames('formfield', 'formfield__alignRight')}>
        <input
          type="submit"
          className={sButton.button}
          disabled={!consent || loading}
          value={loading ? '...' : `${t('common:subscribe_form.submit', 'Subscribe')}`}
        />
      </div>
    </form>
  );
};

export default SubscribeForm;
