import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-cart-empty',
  imports: [RouterLink],
  templateUrl: './cart-empty.component.html',
  styleUrl: './cart-empty.component.css',
})
export class CartEmptyComponent {
  private readonly authService = inject(AuthService);
  isLogged = computed(() => this.authService.isLogged());
}
