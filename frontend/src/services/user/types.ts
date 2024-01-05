import { FormStateUser } from "../../types";

export interface User {
  _id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  dateOfBirth: Date;
  phone: number;
  address: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateUpdateUserResult {
  status: string;
  message: string;
  data: User;
}

export interface UpdateUserParams {
  id: string;
  data: FormStateUser;
}

export interface CreateUserParams extends FormStateUser {}

export interface SignUpParams {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResult {
  status: string;
  message: string;
  access_token?: string;
  refresh_token?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface DefaultResult {
  status: string;
  message: string;
}

export interface DeleteUserParams {
  id: string;
}

export interface DeleteManyUsersParams {
  ids: string[];
}

export interface GetAllUsersResult {
  status: string;
  message: string;
  data: User[];
}

export interface GetDetailsUsersResult {
  status: string;
  message: string;
  data: User;
}