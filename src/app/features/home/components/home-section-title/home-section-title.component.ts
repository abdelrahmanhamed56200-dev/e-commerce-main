import { Component, input } from '@angular/core';

@Component({
  selector: 'app-home-section-title',
  imports: [],
  templateUrl: './home-section-title.component.html',
  styleUrl: './home-section-title.component.css',
})
export class HomeSectionTitleComponent {
  title = input.required();
  title2 = input.required();
}
