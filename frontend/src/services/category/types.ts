import { IFormStateCategory, ICategory } from "../../types";

export interface ICategoryDataResult {
  status: string;
  message: string;
  data?: ICategory;
}

export interface IUpdateCategoryParams {
  id: string;
  data?: IFormStateCategory;
}

export interface ICreateCategoryParams extends IFormStateCategory {}

export interface IDeleteCategoryParams {
  id: string;
}

export interface IDeleteManyCategoriesParams {
  ids: string[];
}

export interface ICategoryDataListResult {
  status: string;
  message: string;
  data?: ICategory[];
}