import React from 'react';
import { FormikContextType } from 'formik';

type FieldProps = {
  name?: string;
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  formik: FormikContextType<any>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const Field: React.FC<FieldProps> = ({
  name,
  id,
  label,
  formik,
  type,
  placeholder,
  onChange
}) => {
  return (
    <label>
      <span className="block text-gray-700 text-sm font-bold my-2">
        {label}
      </span>
      <input
        className="form-field hover:border-gray-500 hover:shadow my-2"
        type={type ?? 'text'}
        placeholder={placeholder}
        value={id ? formik.values[id] : ''}
        id={id}
        onChange={(e) => {
          formik.handleChange(e);

          if (onChange) {
            onChange(e);
          }}}
        onBlur={formik.handleBlur}
      />
    </label>
  );
};

export default Field;
