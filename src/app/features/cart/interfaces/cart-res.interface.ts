import { IProduct } from '../../../core/models/product.interface';

export interface ICartRes {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string | null;
  data: Data;
}

export interface Data {
  _id: string;
  cartOwner: string;
  products: IProductCart[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface IProductCart {
  count: number;
  _id: string;
  product: IProduct;
  price: number;
}
