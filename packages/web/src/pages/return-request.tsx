import React from 'react';
import Layout from '@Organisms/layout';
import ReturnRequestForm from '@Organisms/return-request-form';

const ReturnRequest: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">Return Request</h1>
      <div className="flex justify-center mt-5 return-request-page">
        <div className="w-full max-w-lg">
          <ReturnRequestForm />
        </div>
      </div>
    </Layout>
  );
};

export default ReturnRequest;
