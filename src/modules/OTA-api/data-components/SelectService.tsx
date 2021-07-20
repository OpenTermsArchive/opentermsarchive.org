import React from 'react';
import { SERVICES_URL } from '../api';
import classNames from 'classnames';
import s from './SelectService.module.css';
import useSWR from 'swr';

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
  const { data } = useSWR(SERVICES_URL);

  const services = data ? Object.keys(data).sort() : [];
  const documentTypes: string[] = data ? data[selectedService] || [] : [];

  const loading = !data;

  return (
    <div className={classNames(s.wrapper, className)} {...props}>
      <label htmlFor="services">
        <input
          list="services"
          name="services"
          type="text"
          placeholder={loading ? 'Loading...' : 'Select a service'}
          disabled={loading}
          {...serviceProps}
        />
        <datalist id="services" defaultValue={services[0]}>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </datalist>
      </label>
      <label htmlFor="documentTypes">
        <input
          list="documentTypes"
          name="documentTypes"
          type="text"
          placeholder={loading ? 'Loading...' : !selectedService ? ' - ' : 'Select a document type'}
          disabled={loading || !selectedService}
          {...documentTypeProps}
        />
        <datalist id="documentTypes" defaultValue={documentTypes[0] || ''}>
          {documentTypes.map((documentType) => (
            <option key={`${selectedService}_${documentType}`} value={documentType}>
              {documentType}
            </option>
          ))}
        </datalist>
      </label>
    </div>
  );
};

export default SelectService;
