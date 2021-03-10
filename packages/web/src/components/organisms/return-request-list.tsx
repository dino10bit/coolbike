import React from 'react';
import { useAllReturnRequestsQuery } from '@Generated/graphql';
import ReturnRequestCard from '@Molecules/return-request-card';

import { useAuthQuery } from '../../hooks/auth';

const ReturnRequestList: React.FC = () => {
  const [{ data, fetching }] = useAuthQuery(useAllReturnRequestsQuery);

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="mt-3 all-return-requests">
      {data && data.allReturnRequests.map(request => <ReturnRequestCard key={request.id} returnRequest={request} />)}
    </div>
  );
};

export default ReturnRequestList;
