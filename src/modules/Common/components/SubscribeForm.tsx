import Link from 'next/link';
import React from 'react';
import SelectService from 'modules/OTA-api/data-components/SelectService';
import TextContent from './TextContent';
import classNames from 'classnames';
import sButton from './Button.module.css';
import { useForm } from 'react-hook-form';
import { usePrevious } from 'react-use';
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
  const {
    t,
    i18n: { language },
  } = useTranslation('common');

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
      <h4 className="mb__L">
        {t(
          'common:subscribe_form.title',
          'Be informed by email of the changes on the documents of your choice.'
        )}
      </h4>
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
              {t(
                'common:subscribe_form.changes.before',
                'For this document you may be interested to '
              )}
              <Link
                href={`https://github.com/ambanum/OpenTermsArchive-versions/commits/master/${encodeURIComponent(
                  service
                )}/${encodeURIComponent(documentType)}.md`}
              >
                <a target="_blank" className="a__darked">
                  {t('common:subscribe_form.changes.github', 'see the latest changes on Github ')}
                </a>
              </Link>
              {t('common:subscribe_form.changes.changes.separator', 'or ')}
              <Link
                href={`https://disinfo.quaidorsay.fr/${language}/open-terms-archive/scripta-manent?service=${encodeURIComponent(
                  service
                )}&typeofdocument=${encodeURIComponent(documentType)}`}
              >
                <a target="_blank" className="a__darked">
                  {t(
                    'common:subscribe_form.changes.scripta-manent',
                    'compare versions by date with Scripta Manent.'
                  )}
                </a>
              </Link>
            </p>
            <p className="text__light">
              {t(
                'common:subscribe_form.p2',
                'If you wish to track several documents, simply complete this form as many times as necessary. If you want to subscribre to all documents please contact us.'
              )}
            </p>
          </TextContent>
        )}
      </div>

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
        <input id="consent" type="checkbox" {...register('consent', { required: true })} />
        <label htmlFor="consent">
          {t(
            'common:subscribe_form.consent',
            'Check to agree to receive emails informing you of changes to a document.'
          )}
        </label>
      </div>
      {!!consent && (
        <div className={classNames('formfield')}>
          <TextContent>
            <p className="text__light">
              {t(
                'common:subscribe_form.p3',
                'You can unsubscribe at any time from the link provided in the email.'
              )}
            </p>
            <p className="text__light">
              {t(
                'common:subscribe_form.p1',
                'As the frequency of change of a document can vary from one document to another it is difficult to estimate the frequency of emails you will receive. However, we have observed that large digital services change their documents approximately once every fortnight.'
              )}
            </p>
            <p className="text__light">
              {t(
                'common:subscribe_form.p3',
                'We take care of your data and do not sell it, check our privacy policy.'
              )}
            </p>
          </TextContent>
        </div>
      )}
      <div className={classNames('formfield', 'formfield__alignRight')}>
        <input
          type="submit"
          className={sButton.button}
          disabled={!consent || !email || !service || !documentType || loading}
          value={loading ? '...' : `${t('common:subscribe_form.submit', 'Subscribe')}`}
        />
      </div>
    </form>
  );
};

export default SubscribeForm;
