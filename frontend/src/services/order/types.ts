import { IFormStateOrder, IOrder, IOrderItem } from "../../types";

export interface IOrderDataResult {
  status: string;
  message: string;
  data?: IOrder;
}

export interface IUpdateOrderParams {
  id: string;
  data?: {
    status: string;
    updater: string;
    updatedAt: string;
  };
}

export interface ICreateOrderParams extends IFormStateOrder {}

export interface ICancelOrderParams {
  userId: string;
  data: {
    orderItems: Array<IOrderItem>;
    orderId: string;
  };
}

export interface IDeleteManyOrdersParams {
  ids: string[];
}

export interface IOrderDataListResult {
  status: string;
  message: string;
  data?: IOrder[];
}
