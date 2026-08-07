import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { OrdersApiService } from '../../../../core/services/orders/orders-api.service';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { OrdersAllOrdersComponent } from '../../components/orders-all-orders/orders-all-orders.component';
import { IOrder } from '../../interfaces/orders-response.interface';
import { NotFoundProducesComponent } from '../../../../shared/ui/not-found-produces/not-found-produces.component';
import { Router } from '@angular/router';
import { OrdersOrderCardSkeletonComponent } from '../../components/orders-order-card-skeleton/orders-order-card-skeleton.component';

@Component({
  selector: 'app-orders-page',
  imports: [
    BreadcrumbsCardComponent,
    OrdersAllOrdersComponent,
    NotFoundProducesComponent,
    OrdersOrderCardSkeletonComponent,
  ],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
})
export class OrdersPageComponent implements OnInit {
  private readonly ordersApiService = inject(OrdersApiService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  orders = signal<IOrder[]>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.ordersApiService.getUserOrders(this.authService.userID()).subscribe({
      next: (res) => {
        this.orders.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  startShopping() {
    this.router.navigate(['/']);
  }
}
