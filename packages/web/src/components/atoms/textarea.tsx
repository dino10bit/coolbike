import React from "react";
import { Field, FormikContextType } from 'formik';
import Error from '@Atoms/error';

type TextAreaProps = {
  label?: string;
  type?: string;
  name: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: any;
  classes?: any;
  onChange?: any;
  formik: FormikContextType<any>;
};


const TextArea: React.FC<TextAreaProps> = ({
  label = null,
  type = 'textarea',
  name,
  rows = 5,
  value = '',
  placeholder = '',
  disabled = false,
  required = false,
  className,
  classes,
  onChange,
  formik,
  ...otherProps
}) => {
  const classNames = [
    // styles.input,
    // ...(classes && classes.includes('white') ? [styles['white']] : []),
    className
  ].join(' ');

  return (
    <div className="block">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        component='textarea'
        type={type}
        name={name}
        placeholder={`${placeholder}${required ? '*' : ''}`}
        disabled={disabled}
        // className={classNames}
        className="w-full text-gray-600 border-gray-300 text-base my-2 border-2 rounded-md shadow-sm p-2"
        rows={rows}
        required={required}
        onBlur={() => formik.setFieldTouched(name, true)}
        {...otherProps}
      />
      {formik.errors && formik.errors[name] && formik.touched && formik.touched[name] && (
        <Error formik={formik} message={formik.errors[name] as string} />
      )}
    </div>
  );
};

export default TextArea;
