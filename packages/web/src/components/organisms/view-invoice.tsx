import React from 'react';
import { useContext } from 'react';
import { useOrderQuery } from '@Generated/graphql';
import OrderSimpleView from '@Molecules/order-simple-view';
import { OrderContext } from '../../context/orders/order-provider';
import { useAuthQuery } from '../../hooks/auth';

const ViewInvoice: React.FC = () => {
  const { invoiceNumber } = useContext(OrderContext);
  const [{ data, fetching }] = useAuthQuery(() =>
    useOrderQuery({
      variables: { id: invoiceNumber || '' }
    })
  );

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="mt-3">
      {data && (<OrderSimpleView key={data.order.id} order={data.order} />)}
    </div>
  );
};

export default ViewInvoice;
