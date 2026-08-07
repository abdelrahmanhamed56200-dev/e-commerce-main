import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-not-found-produces',
  imports: [],
  templateUrl: './not-found-produces.component.html',
  styleUrl: './not-found-produces.component.css',
})
export class NotFoundProducesComponent {
  title = input('No Products Found');
  text = input('No products match your current filters.');
  iconClass = input('fa-solid fa-box-open');
  buttonText = input('View All Products');
  disableButton = input(false);
  cardClass = input('');

  isEmpty = input.required<boolean>();

  onClearFilters = output();

  clearFilters() {
    this.onClearFilters.emit();
  }
}
