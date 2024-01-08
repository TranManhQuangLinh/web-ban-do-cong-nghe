import { IFormStateUser, IUser } from "../../types";

export interface ICreateUpdateUserResult {
  status: string;
  message: string;
  data: IUser;
}

export interface IUpdateUserParams {
  id: string;
  data: IFormStateUser;
}

export interface ICreateUserParams extends IFormStateUser {}

export interface ISignUpParams {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginResult {
  status: string;
  message: string;
  access_token?: string;
  refresh_token?: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}
export interface IGetAllUsersResult {
  status: string;
  message: string;
  data: IUser[];
}

export interface IGetDetailsUserResult {
  status: string;
  message: string;
  data: IUser;
}