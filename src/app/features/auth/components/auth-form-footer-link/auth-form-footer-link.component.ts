import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-form-footer-link',
  imports: [RouterLink],
  templateUrl: './auth-form-footer-link.component.html',
  styleUrl: './auth-form-footer-link.component.css',
})
export class AuthFormFooterLinkComponent {
  path = input.required<string[]>();
  pathName = input.required<string>();
  text = input.required<string>();
  queryParams = input.required<any>();
}
