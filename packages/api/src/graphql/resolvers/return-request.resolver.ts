import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';

import { ReturnRequest, ReturnRequestModel } from '@Entities/return-request.entity';
import { ReturnRequestInput } from '@Inputs/return-request.input';

@Resolver(ReturnRequest)
export class ReturnRequestResolver {
  @Query(() => [ReturnRequest])
  async allReturnRequests(): Promise<ReturnRequest[]> {
    const returnRequests = await ReturnRequestModel.find().exec();

    return returnRequests;
  }

  @Query(() => ReturnRequest)
  async returnRequest(@Arg('id', () => ID) id: string): Promise<ReturnRequest> {
    const returnRequest = await ReturnRequestModel.findById(id).exec();

    if (!returnRequest) throw new Error('return request not found');

    return returnRequest;
  }

  @Mutation(() => ReturnRequest)
  async createReturnRequest(@Arg('input') input: ReturnRequestInput): Promise<ReturnRequest> {
    const returnRequest = new ReturnRequestModel(input);

    await returnRequest.save();

    return returnRequest;
  }
}
