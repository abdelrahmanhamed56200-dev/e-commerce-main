import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-auth-submit-button',
  imports: [],
  templateUrl: './auth-submit-button.component.html',
  styleUrl: './auth-submit-button.component.css',
})
export class AuthSubmitButtonComponent {
  text = input.required<string>();
  isLoading = input<boolean>(false);
  onSubmit = output();
  submit() {
    this.onSubmit.emit();
  }
}
