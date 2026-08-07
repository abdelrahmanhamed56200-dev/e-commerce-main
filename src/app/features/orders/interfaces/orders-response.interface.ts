import { IProduct } from '../../../core/models/product.interface';
import { IUser } from '../../../core/models/user-res.interface';

export interface IOrdersResponse {
  results: number;
  metadata: Metadata;
  data: IOrder[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface IOrder {
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: 'card' | 'cash';
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: IUser;
  cartItems: CartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: IProduct;
  price: number;
}
