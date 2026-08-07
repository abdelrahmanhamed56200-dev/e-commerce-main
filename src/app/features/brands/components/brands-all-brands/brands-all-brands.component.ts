import { Component, input } from '@angular/core';
import { BrandsBrandCardComponent } from '../brands-brand-card/brands-brand-card.component';
import { IBrand } from '../../../../core/models/brands.interface';

@Component({
  selector: 'app-brands-all-brands',
  imports: [BrandsBrandCardComponent],
  templateUrl: './brands-all-brands.component.html',
  styleUrl: './brands-all-brands.component.css',
})
export class BrandsAllBrandsComponent {
  brands = input.required<IBrand[]>();
}
