import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-divider',
  imports: [],
  templateUrl: './auth-divider.component.html',
  styleUrl: './auth-divider.component.css',
})
export class AuthDividerComponent {
  text = input.required<string>();
}
