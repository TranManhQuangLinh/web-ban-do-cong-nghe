import { IFormStateProduct, IProduct } from "../../types";

export interface IProductDataResult {
  status: string;
  message: string;
  data?: IProduct;
}

export interface IUpdateProductParams {
  id: string;
  data?: IFormStateProduct;
}

export interface ICreateProductParams extends IFormStateProduct {}

export interface IDeleteProductParams {
  id: string;
}

export interface IDeleteManyProductsParams {
  ids: string[];
}

export interface IGetAllProductsResult {
  status: string;
  message: string;
  data?: IProduct[];
  total: number;
  currentPage: number;
  totalPage: number;
}

export interface IGetAllProductsParams {
  search?: string;
  limit?: number;
}
