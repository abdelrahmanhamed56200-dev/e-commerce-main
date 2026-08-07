import { IProduct } from '../../../core/models/product.interface';

export interface IWishlistProductsRes {
  status: string;
  count: number;
  data: IProduct[];
}
