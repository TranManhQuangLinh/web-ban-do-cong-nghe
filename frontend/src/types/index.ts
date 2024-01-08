export interface IUser {
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

export interface IFormStateUser {
  email?: string;
  password: string;
  role: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  avatar: string;
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFormStateCategory {
  name: string;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  quantityInStock: number;
  discount: number;
  description: string;
  sold: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFormStateProduct {
  name: string;
  image: string;
  category: string;
  price: number;
  quantityInStock: number;
  discount: number;
  description: string;
  sold: number;
}
