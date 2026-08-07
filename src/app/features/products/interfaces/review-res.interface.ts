import { IReview } from '../../../core/models/product.interface';

export interface ReviewRes {
  results: number;
  metadata: Metadata;
  data: IReview[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
