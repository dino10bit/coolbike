import React from 'react';
import { ReturnRequest as IReturnRequest } from '@Generated/graphql';
import { returnReasonOptions } from '@Organisms/return-request-form';

type ReturnRequestProps = {
  returnRequest: Partial<IReturnRequest>;
};

const ReturnRequestCard: React.FC<ReturnRequestProps> = ({ returnRequest }) => {
  const returnReason = returnReasonOptions.find(element => element.value === returnRequest.returnReason);

  return (
    <div
      className={`mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg border-t-4`}
    >
      <div>
        <p className='font-bold text-gray-800'>Serial number: {returnRequest.serialNumber}</p>
        <p className='font-bold text-gray-800 my-2 items-center flex'>
          Invoice number: {returnRequest.invoiceNumber}
        </p>
        {returnReason && (
          <p className='my-2 items-center flex'>
            Return reason: {returnReason.label}
          </p>
        )}
        <p className='my-2 items-center flex'>
          Created at: {new Date(returnRequest.createdAt).toISOString().slice(0,10)}
        </p>
      </div>
      <div>
        <h2 className='text-gray-800 font-bold mt-2'>Comment:</h2>
        <p className='text-gray-800 mt-3 font-light break-all'>
          {returnRequest.comment}
        </p>
        {returnRequest.returnReasonComment && (
          <div>
            <p className='my-2 text-gray-800 font-bold flex'>
              Return reason comment:
            </p>
            <p className='my-2 items-center flex'>
              {returnRequest.returnReasonComment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnRequestCard;
