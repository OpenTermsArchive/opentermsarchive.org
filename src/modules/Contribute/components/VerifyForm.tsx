import * as React from 'react';

import s from './VerifyForm.module.scss';
import { useForm } from 'react-hook-form';

export interface VerifyFormValues {
  name: string;
  documentType: string;
  fetch: string;
  select: string[];
  remove?: string[];
  email?: string;
}

interface VerifyFormProps {
  onSubmit: (data: any) => any;
  documentTypes: string[];
  defaultValues: VerifyFormValues;
}

export default function VerifyForm({ onSubmit, documentTypes, defaultValues }: VerifyFormProps) {
  const { register, handleSubmit } = useForm<VerifyFormValues>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h3>Verify informations (last step)</h3>
      <label className="rf-label">Url to track</label>
      <input className="rf-input" {...register('fetch')} placeholder="Url to track" />

      <h3>Optional Additional Informations</h3>
      <p>
        If you wish, you can add additional information, please refer to the{' '}
        <a
          href="https://github.com/ambanum/OpenTermsArchive#adding-a-new-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </a>{' '}
        on the contribution guide.
      </p>
      <label className="rf-label">Name of the service</label>
      <input className="rf-input" {...register('name')} placeholder="Name" />

      <label className="rf-label">Document type</label>
      <select className="rf-input" {...register('documentType')}>
        <option value="">Select...</option>
        {documentTypes.map((documentType) => (
          <option key={documentType} value={documentType}>
            {documentType}
          </option>
        ))}
      </select>

      {/*<label className="rf-label">Your email, so that we can tell you when it's tracked</label>
      <input className="rf-input" {...register('email')} placeholder="Email" />*/}
      <footer>
        <button className="rf-btn" type="submit">
          Add document
        </button>
      </footer>
    </form>
  );
}
