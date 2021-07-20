import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
export interface SubscribeFormFields {
  email: string;
}

export interface SubscribeFormProps {
  onSubmit: (data: SubscribeFormFields) => any;
}

const SubscribeForm = ({ onSubmit }: SubscribeFormProps) => {
  const { t } = useTranslation('common');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
  });
  console.log(errors);

  const { consent } = getValues();
  console.log(''); //eslint-disable-line
  console.log('╔════START══getValues()══════════════════════════════════════════════════'); //eslint-disable-line
  console.log(getValues()); //eslint-disable-line
  console.log('╚════END════getValues()══════════════════════════════════════════════════'); //eslint-disable-line

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      <select {...register('Title', { required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <input {...register('consent', { required: true })} type="checkbox" />

      <input type="submit" disabled={!consent} />
    </form>
  );
};

export default SubscribeForm;
