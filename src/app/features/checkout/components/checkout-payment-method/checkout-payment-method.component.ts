import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment-method',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-payment-method.component.html',
  styleUrl: './checkout-payment-method.component.css',
})
export class CheckoutPaymentMethodComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  onPaymentTypeChange = output<'cash' | 'card'>();

  paymentTypeValue = signal<'cash' | 'card'>('cash');
  paymentForm = this.fb.group({
    paymentType: [this.paymentTypeValue()],
  });

  ngOnInit(): void {
    this.paymentForm.valueChanges.subscribe((value) => {
      this.paymentTypeValue.set(value.paymentType!);
      this.paymentTypeChange(value.paymentType!);
    });
  }

  paymentTypeChange(paymentType: 'cash' | 'card') {
    this.onPaymentTypeChange.emit(paymentType);
  }
}
