import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, ...priceAfterDiscount: (number | string)[]): number {
    if (!priceAfterDiscount || priceAfterDiscount.length === 0) return 0;

    const numericValues = priceAfterDiscount.map((value) => Number(value));

    const total = numericValues.reduce((sum, val) => sum + val, 0);

    const avgPriceAfterDiscount = total / numericValues.length;

    const discountPercent = ((price - avgPriceAfterDiscount) / price) * 100;

    return Math.floor(discountPercent);
  }
}
