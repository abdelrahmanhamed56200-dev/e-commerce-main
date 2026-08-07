import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-wishlist-empty-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist-empty-wishlist.component.html',
  styleUrl: './wishlist-empty-wishlist.component.css',
})
export class WishlistEmptyWishlistComponent {
  private readonly authService = inject(AuthService);
  isLogged = computed(() => this.authService.isLogged());
}
