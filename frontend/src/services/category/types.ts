import { IFormStateCategory, ICategory } from "../../types";

export interface ICreateUpdateCategoryResult {
  status: string;
  message: string;
  data: ICategory;
}

export interface IUpdateCategoryParams {
  id: string;
  data: IFormStateCategory;
}

export interface ICreateCategoryParams extends IFormStateCategory {}

export interface IDeleteCategoryParams {
  id: string;
}

export interface IDeleteManyCategoriesParams {
  ids: string[];
}

export interface IGetAllCategoriesResult {
  status: string;
  message: string;
  data: ICategory[];
}

export interface IGetDetailsCategoryResult {
  status: string;
  message: string;
  data: ICategory;
}