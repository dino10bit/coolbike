import React, { useState, useEffect } from 'react';
import {
  Order as IOrder,
  OrderProduct,
  Client,
  Product,
  User,
} from '@Generated/graphql';

type OrderProps = {
  order: Pick<IOrder, 'id' | 'invoiceNumber' | 'total' | 'state'> & {
    order: (Pick<OrderProduct, 'id' | 'quantity' | '__typename'> & {
      product: Pick<Product, 'name' | '__typename'>;
    })[];
    client: Pick<Client, 'id' | 'name' | 'email' | 'phone' | 'lastName'>;
    salesman: Pick<User, 'id' | 'name'>;
  };
};

const OrderSimpleView: React.FC<OrderProps> = ({ order }) => {
  const [state, setState] = useState({
    label: order.state,
    value: order.state
  });
  const [stateClass, setStateClass] = useState('');

  useEffect(() => {
    const orderClass = () => {
      if (state.value === 'PENDING') setStateClass('border-yellow-500');
      else if (state.value === 'COMPLETED') setStateClass('border-green-500');
      else setStateClass('border-red-500');
    };

    orderClass();
  }, [state]);

  return (
    <div
      className={`mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg ${stateClass} border-t-4`}
    >
      <div>
        <p className="font-bold text-gray-800">Client: {order.client.name}</p>
        <p className="my-2 items-center flex">
          Invoice number: {order.invoiceNumber}
        </p>
        <h2 className="text-gray-800 font-bold mt-3">Order state: <span className="font-light">{order.state}</span></h2>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold">Overview:</h2>
        {order.order.map(article => (
          <div key={article.id} className="mt-4">
            <p className="text-sm text-gray-600">
              Product: {article.product.name}
            </p>
            <p className="text-sm text-gray-600">
              Quantity: {article.quantity}
            </p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">
          Total Price: <span className="font-light">${order.total}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSimpleView;
