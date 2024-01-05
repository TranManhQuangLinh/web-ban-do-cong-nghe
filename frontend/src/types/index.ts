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

export interface FormStateUser {
  email?: string;
  password: string;
  role: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  avatar: string;
}
