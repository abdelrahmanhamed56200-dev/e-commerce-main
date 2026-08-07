import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-form-title',
  imports: [],
  templateUrl: './auth-form-title.component.html',
  styleUrl: './auth-form-title.component.css',
})
export class AuthFormTitleComponent {
  title = input.required<string>();
  text = input<string>('');
  textClass = input<string>('');
}
