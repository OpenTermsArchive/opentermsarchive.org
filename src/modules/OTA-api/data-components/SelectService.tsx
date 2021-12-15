import { FiChevronDown } from 'react-icons/fi';
import React from 'react';
import { Services } from '../api';
import classNames from 'classnames';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';

type SelectServiceProps = {
  serviceProps: any;
  documentTypeProps: any;
  service: string;
  documentType: string;
  defaultServices: any;
} & React.HTMLAttributes<HTMLDivElement>;

// https://github.com/ambanum/OpenTermsArchive.org/issues/21
const dmaActors = [
  'Amazon.com',
  'Apple',
  'Facebook',
  'Google',
  'Gmail',
  'Instagram',
  'Spotify',
  'TikTok',
  'WhatsApp',
  'YouTube',
];

const SelectService: React.FC<SelectServiceProps> = React.memo(
  ({
    serviceProps,
    documentTypeProps,
    service: selectedService,
    documentType: selectedDocumentType,
    defaultServices = {},
  }) => {
    const { t } = useTranslation();
    const { data: services } = useSWR<Services>('/api/ota/services/all', {
      initialData: defaultServices,
      revalidateOnMount: true,
    });

    const documentTypes: string[] = services ? services[selectedService] || [] : [];

    const loading = !services;

    const dmaServices = Object.keys(services || {}).filter((service) =>
      dmaActors.includes(service)
    );

    return (
      <>
        <div className={classNames('formfield')}>
          <label htmlFor="services">{t('common:subscribe_form.fields.service.label')}</label>
          <div className={classNames('select')}>
            {
              // This is done in order for default values to be selected correctly
              // if the options are not present at init, it will never be selected
              loading ? (
                <select key="select_service_disabled" disabled />
              ) : (
                <select
                  key="select_service"
                  id="services"
                  defaultValue={selectedService}
                  {...serviceProps}
                >
                  <option value="">{t('common:subscribe_form.fields.service.default')}</option>
                  <optgroup label={t('common:subscribe_form.fields.service.optgroup.gatekeepers')}>
                    {dmaServices.map((service) => (
                      <option
                        key={`dma_${selectedService}_${service}`}
                        value={service}
                        selected={service === selectedService}
                      >
                        {service}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup
                    label={t('common:subscribe_form.fields.service.optgroup.otherservices')}
                  >
                    {Object.keys(services || {}).map((service) => (
                      <option
                        key={`${selectedService}_${service}`}
                        value={service}
                        selected={service === selectedService}
                      >
                        {service}
                      </option>
                    ))}
                  </optgroup>
                </select>
              )
            }
            <FiChevronDown color="#333333"></FiChevronDown>
          </div>
        </div>
        <div className={classNames('formfield')}>
          <label htmlFor="documentTypes">{t('common:subscribe_form.fields.document.label')}</label>
          <div className={classNames('select')}>
            {
              // This is done in order for default values to be selected correctly
              // if the options are not present at init, it will never be selected
              loading ? (
                <select key="select_documentTypes_disabled" disabled />
              ) : (
                <select
                  key={`select_documentTypes`}
                  id="documentTypes"
                  defaultValue={selectedDocumentType}
                  {...documentTypeProps}
                >
                  <option value="">{t('common:subscribe_form.fields.document.default')}</option>
                  {documentTypes.map((documentType) => (
                    <option key={`${selectedService}_${documentType}`} value={documentType}>
                      {documentType}
                    </option>
                  ))}
                </select>
              )
            }
            <FiChevronDown color="#333333"></FiChevronDown>
          </div>
        </div>
      </>
    );
  }
);

export default SelectService;
