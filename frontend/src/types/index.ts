import { JwtPayload } from "jwt-decode";

// User
export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
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

// Category
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

// Product
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

// Order
export interface IOrderItem {
    discount: number;
    image: string;
    name: string;
    price: number;
    product: string;
    quantity: number;
    quantityInStock: number;
    _id?: string;
}

export interface IShippingAddress { recipientName: string; address: string; phone?: string }
export interface IUpdateHistory {
  status: string;
  updatedAt: string;
  updater: string;
  _id: string;
}

export interface IOrder {
  currentStatus: string;
  itemsPrice: number;
  orderItems: Array<IOrderItem>;
  paymentMethod: string;
  shippingAddress: IShippingAddress;
  shippingFee: number;
  shippingPrice: string;
  totalPrice: number;
  updateHistory: Array<IUpdateHistory>;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface IOrderDataTable {
  currentStatus: React.JSX.Element;
  itemsPrice: number;
  orderItems: Array<IOrderItem>;
  paymentMethod: string;
  shippingAddress: IShippingAddress;
  shippingFee: number;
  shippingPrice: string;
  totalPrice: string;
  updateHistory: Array<IUpdateHistory>;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface IFormStateOrder {
  currentStatus: string;
  itemsPrice: number;
  orderItems: Array<IOrderItem>;
  paymentMethod: string;
  shippingAddress: IShippingAddress;
  shippingFee: number;
  shippingPrice: string;
  totalPrice: number;
  updateHistory: Array<IUpdateHistory>;
  user: string;
}

// ShippingPrice
export interface IShippingPrice {
  maxOrderAmount?: number;
  shippingFee: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IShippingPriceDataTable {
  maxOrderAmount?: string;
  shippingFee: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFormStateShippingPrice {
  maxOrderAmount?: number;
  shippingFee: number;
}


export interface IDecode extends JwtPayload {
  id: string;
  role: string;
}