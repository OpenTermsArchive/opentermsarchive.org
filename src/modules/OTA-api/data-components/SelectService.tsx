import { FiChevronDown } from 'react-icons/fi';
import React from 'react';
import { SERVICES_URL } from '../api';
import classNames from 'classnames';
import s from './SelectService.module.css';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';

type SelectServiceProps = {
  serviceProps: any;
  documentTypeProps: any;
  service: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SelectService: React.FC<SelectServiceProps> = ({
  children,
  className,
  serviceProps,
  documentTypeProps,
  service: selectedService,
  ...props
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
          <select id="services" disabled={loading} {...serviceProps}>
            <option selected disabled hidden>
              {t('common:subscribe_form.fields.service.default', 'Service')}
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <FiChevronDown color="#333333"></FiChevronDown>
        </div>
      </div>
      <div className={classNames('formfield')}>
        <label htmlFor="documentTypes">
          {t('common:subscribe_form.fields.document.label', 'Select a document type')}
        </label>
        <div className={classNames('select')}>
          <select id="documentTypes" disabled={loading || !selectedService} {...documentTypeProps}>
            <option selected disabled hidden>
              {t('common:subscribe_form.fields.document.default', 'Document')}
            </option>
            {documentTypes.map((documentType) => (
              <option key={`${selectedService}_${documentType}`} value={documentType}>
                {documentType}
              </option>
            ))}
          </select>
          <FiChevronDown color="#333333"></FiChevronDown>
        </div>
      </div>
    </>
  );
};

export default SelectService;
