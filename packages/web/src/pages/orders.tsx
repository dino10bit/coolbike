import React from 'react';
import Link from 'next/link';

import Layout from '@Organisms/layout';
import OrderList from '@Organisms/order-list';

const Orders: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 mb-3">Orders</h1>
      <Link href="/new-order">
        <a className="my-3 form-button">New Order</a>
      </Link>
      <OrderList />
    </Layout>
  );
};

export default Orders;
