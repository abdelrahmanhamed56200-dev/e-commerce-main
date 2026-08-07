import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-auth-social-buttons',
  imports: [],
  templateUrl: './auth-social-buttons.component.html',
  styleUrl: './auth-social-buttons.component.css',
})
export class AuthSocialButtonsComponent {
  disPlayLayout = input<'col' | 'row'>('col');
  onSocialSelect = output<'facebook' | 'google'>();

  selectSocial(value: 'facebook' | 'google') {
    this.onSocialSelect.emit(value);
  }
}
