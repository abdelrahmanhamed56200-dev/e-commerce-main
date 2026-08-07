import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-link',
  imports: [RouterLink],
  templateUrl: './back-link.component.html',
  styleUrl: './back-link.component.css',
})
export class BackLinkComponent {
  url = input.required<string>();
  pageTitle = input.required<string>();
}
