import React from 'react';
import { FormikContextType } from 'formik';

type ErrorProps = {
  id?: string;
  formik?: FormikContextType<any>;
  message?: string;
};

const Error: React.FC<ErrorProps> = ({ formik, id, message }) => {
  if ((id && formik?.errors[id] && formik?.touched[id]) || message)
    return (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>{id ? formik?.errors[id] : message}</p>
      </div>
    );

  return null;
};

export default Error;
