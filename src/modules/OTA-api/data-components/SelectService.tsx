import { FiChevronDown } from 'react-icons/fi';
import React from 'react';
import { SERVICES_URL } from '../api';
import classNames from 'classnames';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';

type SelectServiceProps = {
  serviceProps: any;
  documentTypeProps: any;
  service: string;
  documentType: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SelectService: React.FC<SelectServiceProps> = ({
  serviceProps,
  documentTypeProps,
  service: selectedService,
  documentType: selectedDocumentType,
}) => {
  const { t } = useTranslation('common');
  const { data } = useSWR(SERVICES_URL);

  const services = data ? Object.keys(data).sort() : [];
  const documentTypes: string[] = data ? data[selectedService] || [] : [];

  const loading = !data;

  return (
    <>
      <div className={classNames('formfield')}>
        <label htmlFor="services">
          {t('common:subscribe_form.fields.service.label', 'Select a service')}
        </label>
        <div className={classNames('select')}>
          {
            // This is done in order for default values to be selected correctly
            // if the options are not present at init, it will never be selected
            loading ? (
              <select disabled />
            ) : (
              <select id="services" defaultValue={selectedService} {...serviceProps}>
                <option value="">
                  {t('common:subscribe_form.fields.service.default', 'Select...')}
                </option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            )
          }
          <FiChevronDown color="#333333"></FiChevronDown>
        </div>
      </div>
      <div className={classNames('formfield')}>
        <label htmlFor="documentTypes">
          {t('common:subscribe_form.fields.document.label', 'Select a document type')}
        </label>
        <div className={classNames('select')}>
          {
            // This is done in order for default values to be selected correctly
            // if the options are not present at init, it will never be selected
            loading ? (
              <select disabled />
            ) : (
              <select
                id="documentTypes"
                disabled={!selectedService}
                defaultValue={selectedDocumentType}
                {...documentTypeProps}
              >
                <option value="">
                  {t('common:subscribe_form.fields.document.default', 'Select...')}
                </option>
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
};

export default SelectService;
