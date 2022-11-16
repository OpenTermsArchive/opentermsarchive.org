import { Link } from 'modules/I18n';
import React from 'react';
import SelectService from 'modules/OTA-api/data-components/SelectService';
import TextContent from './TextContent';
import classNames from 'classnames';
import sButton from './Button.module.css';
import { useForm } from 'react-hook-form';
import { usePrevious } from 'react-use';
import { useTranslation } from 'modules/I18n';

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
  onSubmit: (data: SubscribeFormFields) => Promise<boolean>;
  onChange: (data: Partial<{ service: string; documentType: string }>) => any;
}

const SubscribeForm = ({
  onSubmit: onExternalSubmit,
  onChange,
  loading = false,
  defaultValues,
  defaultServices,
}: SubscribeFormProps) => {
  const { t, lang: language } = useTranslation();

  const { register, handleSubmit, watch, reset } = useForm<SubscribeFormFields>({
    reValidateMode: 'onChange',
    defaultValues,
  });

  const { consent, service, documentType, email } = watch();
  const previousService = usePrevious(service);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    onChange({
      ...(service ? { service } : {}),
      ...(documentType ? { documentType } : {}),
    });
  }, [service, documentType]);

  // reset document type on service change
  React.useEffect(() => {
    if (previousService !== service && !!previousService && !!documentType) {
      reset({ documentType: undefined, service, email, consent });
    }
  }, [previousService, documentType, service, reset, email, consent]);

  // reset document type and service when submit as occured
  // we need to decouple submit from reset as explained here https://react-hook-form.com/api/useform/reset
  React.useEffect(() => {
    if (success) {
      // we keep the same service if there are many as the user may want to subscribe to all documentTypes
      // from the same service
      const newService = defaultServices[service].length === 1 ? undefined : service;
      reset({ service: newService, documentType: undefined, email, consent });
      setSuccess(false);
    }
  }, [success, reset, email, consent, service]);

  // reset all fields on submit
  const onSubmit = async (data: any) => {
    const success = await onExternalSubmit(data);
    setSuccess(success);
  };

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
        {!!service && !!documentType && (
          <TextContent>
            <p>
              {t('common:subscribe_form.changes.before')}
              <Link
                href={`https://github.com/ambanum/OpenTermsArchive-versions/commits/master/${encodeURIComponent(
                  service
                )}/${encodeURIComponent(documentType)}.md`}
              >
                <a target="_blank" rel="noopener" className="a__darked">
                  {t('common:subscribe_form.changes.github')}
                </a>
              </Link>
              {t('common:subscribe_form.changes.changes.separator')}
              <Link
                href={`https://disinfo.quaidorsay.fr/${language}/open-terms-archive/scripta-manent?service=${encodeURIComponent(
                  service
                )}&typeofdocument=${encodeURIComponent(documentType)}`}
              >
                <a target="_blank" rel="noopener" className="a__darked">
                  {t('common:subscribe_form.changes.scripta-manent')}
                </a>
              </Link>
            </p>
            <p className="text__light">{t('common:subscribe_form.p2')}</p>
          </TextContent>
        )}
      </div>

      <div className={classNames('formfield')}>
        <label htmlFor="email">{t('common:subscribe_form.fields.email.label')}</label>
        <input
          id="email"
          type="email"
          placeholder={t('common:subscribe_form.fields.email.input.placeholder')}
          {...register('email', { required: true })}
        />
      </div>
      <div className={classNames('formfield', 'formfield__flex')}>
        <input id="consent" type="checkbox" {...register('consent', { required: true })} />
        <label htmlFor="consent">{t('common:subscribe_form.consent')}</label>
      </div>
      {!!consent && (
        <div className={classNames('formfield')}>
          <TextContent>
            <p className="text__light">{t('common:subscribe_form.p1')}</p>
            <p className="text__light">{t('common:subscribe_form.p2')}</p>
            <p className="text__light">{t('common:subscribe_form.p3')}</p>
          </TextContent>
        </div>
      )}
      <div className={classNames('formfield', 'formfield__alignRight')}>
        <input
          type="submit"
          className={sButton.button}
          disabled={!consent || !email || !service || !documentType || loading}
          value={loading ? '...' : `${t('common:subscribe_form.submit')}`}
        />
      </div>
    </form>
  );
};

export default SubscribeForm;
