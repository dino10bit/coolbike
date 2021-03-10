import React from 'react';
import Select, { components } from 'react-select';
import { useFormikContext, useField } from 'formik';
import Error from '@Atoms/error';

const Placeholder = (props: any) => {
  return <components.Placeholder {...props} />;
};

export default function CustomSelect({options, placeholder, styles, onChange, ...props}) {
  const {setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(props.name);

  async function handleChange(selected) {
    await onChange(selected);
    setFieldValue(props.name, selected);
  }

  function handleBlur() {
    setFieldTouched(props.name, true);
  }

  return (
    <>
      <Select
        className="return-request-select leading-tight text-center text-base text-gray-800 mt-2 border-green-400"
        options={options}
        components={ Placeholder }
        placeholder={placeholder}
        styles={styles}
        {...field}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {meta.touched && meta.error ? (<Error formik={props} message={meta.error.value} />) : null}
    </>
  )
}
