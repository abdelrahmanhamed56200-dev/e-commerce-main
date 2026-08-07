import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { STORED_KEYS } from '../../constants/stored-keys';
import { IProduct } from '../../models/product.interface';
import { IUser, IUserRes } from '../../models/user-res.interface';
import { IProductCart } from '../../../features/cart/interfaces/cart-res.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  // search
  setSearchDisplayMode(value: string) {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.setItem(STORED_KEYS.searchDisplayMode, value);
    }
  }
  getSearchDisplayMode(): 'grid' | 'list' {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return (localStorage.getItem(STORED_KEYS.searchDisplayMode) || 'grid') as 'grid' | 'list';
    } else {
      return 'grid';
    }
  }

  // wishlist
  toggleProductToWishlist(product: IProduct): void {
    if (isPlatformServer(this.pLATFORM_ID)) return;

    let allProductWishlist = JSON.parse(
      localStorage.getItem(STORED_KEYS.wishlist) || '[]',
    ) as IProduct[];

    if (allProductWishlist.find((p) => p._id === product._id)) {
      allProductWishlist = allProductWishlist.filter((p) => p._id !== product._id);
    } else {
      allProductWishlist.unshift(product);
    }
    localStorage.setItem(STORED_KEYS.wishlist, JSON.stringify(allProductWishlist));
  }
  getAllWishlistProducts(): IProduct[] {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return JSON.parse(localStorage.getItem(STORED_KEYS.wishlist) || '[]');
    } else {
      return [];
    }
  }
  getAllWishlistProductsCount(): number {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return JSON.parse(localStorage.getItem(STORED_KEYS.wishlist) || '[]').length;
    }
    return 0;
  }
  removeAllWishlistProducts() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.setItem(STORED_KEYS.wishlist, '[]');
    }
  }

  // cart
  getAllCartProducts(): IProductCart[] {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return JSON.parse(localStorage.getItem(STORED_KEYS.cart) || '[]');
    } else {
      return [];
    }
  }
  addProductToCart(product: IProduct, productQuantity: number): void {
    if (isPlatformServer(this.pLATFORM_ID)) return;

    let allProductCart = JSON.parse(
      localStorage.getItem(STORED_KEYS.cart) || '[]',
    ) as IProductCart[];
    let index = allProductCart.findIndex((p) => p.product._id === product._id);

    if (index >= 0) {
      allProductCart[index] = {
        product: product,
        count: Number(productQuantity) + Number(allProductCart[index].count),
        _id: product._id,
        price: product.price,
      };
    } else {
      allProductCart.unshift({
        product: product,
        count: productQuantity,
        _id: product._id,
        price: product.price,
      });
    }
    localStorage.setItem(STORED_KEYS.cart, JSON.stringify(allProductCart));
  }
  setNewQuantityProductCart(product: IProduct, productQuantity: number): void {
    if (isPlatformServer(this.pLATFORM_ID)) return;

    let allProductCart = JSON.parse(
      localStorage.getItem(STORED_KEYS.cart) || '[]',
    ) as IProductCart[];

    let index = allProductCart.findIndex((p) => p.product._id === product._id);

    if (index >= 0) {
      allProductCart[index] = {
        product: product,
        count: productQuantity,
        _id: product._id,
        price: product.price,
      };
    }
    localStorage.setItem(STORED_KEYS.cart, JSON.stringify(allProductCart));
  }
  removeProductCart(product: IProduct, productQuantity?: number): void {
    if (isPlatformServer(this.pLATFORM_ID)) return;

    let allProductCart = JSON.parse(
      localStorage.getItem(STORED_KEYS.cart) || '[]',
    ) as IProductCart[];
    let index = allProductCart.findIndex((p) => p.product._id === product._id);
    if (index < 0) return;

    if (productQuantity && allProductCart[index].count - productQuantity > 0) {
      allProductCart[index] = {
        product: product,
        count: allProductCart[index].count - productQuantity,
        _id: product._id,
        price: product.price,
      };
    } else {
      allProductCart = allProductCart.filter((p) => p.product._id !== product._id);
    }
    localStorage.setItem(STORED_KEYS.cart, JSON.stringify(allProductCart));
  }
  getCartProductsCount(): number {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      let counter = 0;
      const products = JSON.parse(localStorage.getItem(STORED_KEYS.cart) || '[]') as IProductCart[];
      counter = products.length;
      return counter;
    }
    return 0;
  }
  removeAllCartProducts() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.setItem(STORED_KEYS.cart, '[]');
    }
  }

  // user
  setUserToken(token: string) {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.setItem(STORED_KEYS.token, token);
    }
  }
  setUser(user: IUserRes) {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.setUserToken(user.token);
      localStorage.setItem(STORED_KEYS.user, JSON.stringify(user.user));
    }
  }
  getUserToken(): string | null {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const token = localStorage.getItem(STORED_KEYS.token);
      if (token) return token;
    }
    return null;
  }
  getUserData(): IUser | null {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const data = localStorage.getItem(STORED_KEYS.user);
      if (data) {
        const user = JSON.parse(data);
        return user;
      }
    }
    return null;
  }
  removeUser() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.removeItem(STORED_KEYS.token);
      localStorage.removeItem(STORED_KEYS.user);
    }
  }
}
