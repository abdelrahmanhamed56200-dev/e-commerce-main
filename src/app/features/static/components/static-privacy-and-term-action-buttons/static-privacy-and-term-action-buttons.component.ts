import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-static-privacy-and-term-action-buttons',
  imports: [RouterLink],
  templateUrl: './static-privacy-and-term-action-buttons.component.html',
  styleUrl: './static-privacy-and-term-action-buttons.component.css',
})
export class StaticPrivacyAndTermActionButtonsComponent {
  paths = input.required<string[]>();
  pathName = input.required<string>();
}
