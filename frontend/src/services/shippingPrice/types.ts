import { IFormStateShippingPrice, IShippingPrice } from "../../types";

export interface IShippingPriceDataResult {
  status: string;
  message: string;
  data: IShippingPrice;
}

export interface IUpdateShippingPriceParams {
  id: string;
  data: IFormStateShippingPrice;
}

export interface ICreateShippingPriceParams extends IFormStateShippingPrice {}

export interface IDeleteShippingPriceParams {
  id: string;
}

export interface IDeleteManyShippingPricesParams {
  ids: string[];
}

export interface IShippingPriceDataListResult {
  status: string;
  message: string;
  data: IShippingPrice[];
}
