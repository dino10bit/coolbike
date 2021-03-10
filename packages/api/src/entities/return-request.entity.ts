import { ObjectType, Field, Int, ID } from 'type-graphql';
import { Prop, getModelForClass, Index } from '@typegoose/typegoose';

@ObjectType()
@Index({ name: 'text' })
export class ReturnRequest {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  serialNumber!: string;

  @Field(() => Int)
  @Prop({ required: true })
  invoiceNumber!: number;

  @Field(() => Int)
  @Prop({ required: true })
  returnReason!: number;

  @Field()
  @Prop({ trim: true, required: false })
  returnReasonComment!: string;

  @Field()
  @Prop({ trim: true, required: true })
  comment!: string;

  @Field()
  createdAt!: Date;
}

export const ReturnRequestModel = getModelForClass(ReturnRequest, {
  schemaOptions: { timestamps: true }
});
