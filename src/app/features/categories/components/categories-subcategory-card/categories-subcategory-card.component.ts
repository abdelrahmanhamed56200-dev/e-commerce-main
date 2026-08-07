import { Component, HostBinding, input } from '@angular/core';
import { ISubcategory } from '../../../../core/models/subcategory.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-subcategory-card',
  imports: [RouterLink],
  templateUrl: './categories-subcategory-card.component.html',
  styleUrl: './categories-subcategory-card.component.css',
})
export class CategoriesSubcategoryCardComponent {
  subcategory = input.required<ISubcategory>();
}
