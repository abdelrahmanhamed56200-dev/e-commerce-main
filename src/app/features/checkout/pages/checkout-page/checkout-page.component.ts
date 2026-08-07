import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from '../../../../../environments/environment';
import { IAddress, IAddressesResponse } from '../../../../core/models/addresses-response.interface';
import { AddressApiService } from '../../../../core/services/address/address-api.service';
import { CartApiService } from '../../../../core/services/cart/cart-api.service';
import { OrdersApiService } from '../../../../core/services/orders/orders-api.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { CartEmptyComponent } from '../../../cart/components/cart-empty/cart-empty.component';
import { ICartRes } from '../../../cart/interfaces/cart-res.interface';
import { CheckoutOrderSummaryComponent } from '../../components/checkout-order-summary/checkout-order-summary.component';
import { CheckoutPaymentMethodComponent } from '../../components/checkout-payment-method/checkout-payment-method.component';
import { CheckoutShippingAddressComponent } from '../../components/checkout-shipping-address/checkout-shipping-address.component';

@Component({
  selector: 'app-checkout-page',
  imports: [
    BreadcrumbsCardComponent,
    RouterLink,
    CheckoutOrderSummaryComponent,
    CheckoutPaymentMethodComponent,
    CheckoutShippingAddressComponent,
    CartEmptyComponent,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cartApiService = inject(CartApiService);
  private readonly addressApiService = inject(AddressApiService);
  private readonly ordersApiService = inject(OrdersApiService);
  private readonly toastr = inject(MyToastrService);
  private readonly router = inject(Router);

  cartRes = signal<ICartRes>({} as ICartRes);
  userAddresses = signal<IAddress[]>([]);

  paymentType = signal<'cash' | 'card'>('cash');
  isLoadingData = signal(false);
  isLoading = signal(false);
  isCartEmpty = signal(false);
  isValidAddress = signal(false);

  addressForm: FormGroup = this.fb.group(
    {
      city: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 2 }),
          RxwebValidators.maxLength({ value: 50 }),
          RxwebValidators.pattern({
            expression: {
              validCity: /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/,
            },
          }),
        ],
      ],
      details: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 10 }),
          RxwebValidators.maxLength({ value: 200 }),
        ],
      ],
      phone: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({
            expression: {
              egyptPhone: /^(?:\+20|0020|0)?1[0125][0-9]{8}$/,
            },
          }),
        ],
      ],
    },
    { nullable: false },
  );
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    if (this.isLoadingData()) return;
    this.isLoadingData.set(true);
    this.cartApiService.getAllProductCart_v2().subscribe({
      next: (res) => {
        this.cartRes.set(res);
        this.isCartEmpty.set(res.cartId ? false : true);
        if (this.isCartEmpty()) this.isLoadingData.set(false);
        else this.getLoggedUserAddresses();
      },
      error: () => {
        this.isLoadingData.set(false);
        this.isCartEmpty.set(true);
      },
    });
  }
  getLoggedUserAddresses() {
    this.addressApiService.getLoggedUserAddresses().subscribe({
      next: (res: IAddressesResponse) => {
        this.userAddresses.set(res.data);
        this.isLoadingData.set(false);
      },
      error: () => {
        this.isLoadingData.set(false);
      },
    });
  }
  onPaymentTypeChange(paymentType: 'cash' | 'card') {
    this.paymentType.set(paymentType);
  }

  onCheckout() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.invalid) return;

    if (this.paymentType() === 'cash') this.checkoutCash();
    else this.checkoutCard();
  }

  checkoutCash() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.ordersApiService
      .createCashOrderFromCart_v1(this.cartRes().cartId!, this.addressForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading.set(false);
          this.toastr.success('Order placed successfully!');
          this.router.navigateByUrl('/allorders');
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.toastr.error(err.error.message);
        },
      });
  }
  checkoutCard() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.ordersApiService
      .checkoutSession(
        this.cartRes().cartId!,
        environment.appUrl.slice(0, -1),
        this.addressForm.value,
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          window.location.assign(res.session.url);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.toastr.error(err.error.message);
        },
      });
  }
}
