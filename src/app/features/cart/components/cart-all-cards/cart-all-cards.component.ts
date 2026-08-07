import { Component, input } from '@angular/core';
import { IProductCart } from '../../interfaces/cart-res.interface';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { CartCardSkeltonComponent } from '../cart-card-skelton/cart-card-skelton.component';

@Component({
  selector: 'app-cart-all-cards',
  imports: [CartCardComponent, CartCardSkeltonComponent],
  templateUrl: './cart-all-cards.component.html',
  styleUrl: './cart-all-cards.component.css',
})
export class CartAllCardsComponent {
  products = input.required<IProductCart[]>();
}
