import { Component, input } from '@angular/core';
import { IProduct } from '../../../../core/models/product.interface';
import { WishlistCardSkeltonComponent } from '../wishlist-card-skelton/wishlist-card-skelton.component';
import { WishlistCardComponent } from '../wishlist-card/wishlist-card.component';

@Component({
  selector: 'app-wishlist-all-cards',
  imports: [WishlistCardComponent, WishlistCardSkeltonComponent],
  templateUrl: './wishlist-all-cards.component.html',
  styleUrl: './wishlist-all-cards.component.css',
})
export class WishlistAllCardsComponent {
  wishlistProducts = input.required<IProduct[]>();
}
