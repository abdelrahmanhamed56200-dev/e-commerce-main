import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBrand } from '../../../../core/models/brands.interface';

@Component({
  selector: 'app-brands-brand-cart',
  imports: [RouterLink],
  templateUrl: './brands-brand-card.component.html',
  styleUrl: './brands-brand-card.component.css',
})
export class BrandsBrandCardComponent {
  brand = input.required<IBrand>();
}
