import React from 'react';
import { FormikContextType } from 'formik';

import Field from '@Atoms/field';
import Error from '@Atoms/error';

type FieldErrorProps = {
  formik: FormikContextType<any>;
  name?: string;
  id?: string;
  label?: string;
  type?: 'email' | 'tel' | 'number' | 'text' | 'password';
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FieldError: React.FC<FieldErrorProps> = ({
  formik,
  name,
  id,
  type = 'text',
  placeholder,
  label,
  onChange,
}) => {
  // const nameCapitalize = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <Field
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        label={label}
        formik={formik}
        onChange={onChange}
      />
      <Error formik={formik} id={id} />
    </>
  );
};

export default FieldError;
