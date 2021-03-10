import React from 'react';
import Link from 'next/link';

import Layout from '@Organisms/layout';
import ReturnRequestList from '@Organisms/return-request-list';

const Orders: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 mb-3">All return requests</h1>
      <Link href="/return-request">
        <a className="my-3 form-button">New return request</a>
      </Link>
      <ReturnRequestList />
    </Layout>
  );
};

export default Orders;
