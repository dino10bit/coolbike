import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';

import {
  useCreateReturnRequestMutation,
  ReturnRequestInput
} from '@Generated/graphql';
import Form from '@Atoms/form';
import Error from '@Atoms/error';
import Button from '@Atoms/button';
import CustomSelect from '@Atoms/select';
import FieldError from '@Molecules/field-error';
import TextArea from '@Atoms/textarea';
import ViewInvoice from '@Organisms/view-invoice';
import { useAuthMutation } from '../../hooks/auth';
import { OrderContext } from '../../context/orders/order-provider';

type ReturnRequestFormProps = {};

enum Reason {
  BROKEN_PART = 'Broken part',
  UNUSED_PART = 'Unused part',
  OTHER = 'Other'
}

export const returnReasonOptions = [
  { label: Reason.BROKEN_PART, value: 1 },
  { label: Reason.UNUSED_PART, value: 2 },
  { label: Reason.OTHER, value: 3 }
];

const returnReasonStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: '#f0f0f0',
    borderWidth: '2px'
  })
};

const ReturnRequestForm: React.FC<ReturnRequestFormProps> = () => {
  const [state, setState] = useState({
    label: null,
    value: null
  });
  const [showReturnReasonComment, setReturnReasonComment] = useState(false);
  const handleChange = async (option: typeof state) => {
    if (option.value === state.value) return;
    setState(option);
    setReturnReasonComment(option.label === Reason.OTHER);
  };
  const router = useRouter();
  const [{ error: createError }, createReturnRequest] = useAuthMutation(
    useCreateReturnRequestMutation
  );
  const { selectInvoiceNumber } = useContext(OrderContext);

  return (
    <>
      <Formik
        validationSchema={() =>
          yup.object().shape({
            serialNumber: yup.string()
              .required('the serial number is required field')
              .min(6, 'This field can contain at least 6 characters')
              .max(10, 'This field can contain at most 10 characters')
              .matches(/^[a-zA-Z0-9]+$/, 'you can use only letters or numbers in this field'),
            invoiceNumber: yup.string()
              .required('the invoice number is required field')
              .matches(/^[0-9]+$/, 'you can use only numbers in this field')
              .max(6, 'This field can contain at most 6 characters'),
            returnReason: yup.object({
              label: yup.string().required(),
              value: yup.string().required('Return reason is a required field')
            }),
            returnReasonComment: yup.string().max(240, 'Comment field must contain at most 240 characters'),
            comment: yup.string().max(240, 'Comment field must contain at most 240 characters')
          })
        }
        initialValues={{
          serialNumber: '',
          invoiceNumber: '',
          // returnReason: data?.returnRequest.returnReason || 0,
          returnReasonComment: '',
          comment: ''
        }}

        onSubmit={async (input: ReturnRequestInput) => {
          const payload: ReturnRequestInput = {
            ...input,
            returnReason: input.returnReason.value
          };

          const { data } = await createReturnRequest({ input: payload });

          if (!data) {
            return;
          }

          await router.push('/all-return-requests');
        }}
      >
        {props => (
          <Form formik={props}>
            <div className='text-lg text-gray-600 mb-5'>Please provide us some details:</div>
            <Error
              message={
                createError?.graphQLErrors[0].message
              }
            />
            <FieldError id='serialNumber' formik={props}
                        placeholder="Please provide us your part's serial number" />
            <CustomSelect
              name='returnReason'
              placeholder={<span
                className='font-normal text-base text-gray-400'>Select the reason of your return item</span>}
              options={returnReasonOptions}
              styles={returnReasonStyles}
              onChange={handleChange as any}
            />
            {showReturnReasonComment && (
              <TextArea name='returnReasonComment' placeholder='Please tell us, what was the reason?' formik={props} />
            )}
            <FieldError id='invoiceNumber' type='number' formik={props}
                        placeholder='Please provide us your invoice number'
                        onChange={event => selectInvoiceNumber(event.target.value)} />
            <TextArea name='comment' placeholder='Place your comment here' formik={props} />

            <div className='flex flex-wrap'>
              <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/2 mb-4 pr-4'>
                <Button type='reset' onClick={e => props.resetForm()}>Cancel</Button>
              </div>
              <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/2 mb-4 pl-4'>
                <Button type='submit'>Submit</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ViewInvoice />
    </>
  );
};

export default ReturnRequestForm;
