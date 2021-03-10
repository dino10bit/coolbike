import { InputType, Field, Int } from 'type-graphql';

import { ReturnRequest } from '@Entities/return-request.entity';

@InputType()
export class ReturnRequestInput implements Partial<ReturnRequest> {
  @Field()
  serialNumber!: string;

  @Field(() => Int)
  invoiceNumber!: number;

  @Field(() => Int)
  returnReason!: number;

  @Field()
  returnReasonComment!: string;

  @Field()
  comment!: string;
}
