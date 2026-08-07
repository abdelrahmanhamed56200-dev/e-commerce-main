import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-sittings-card',
  imports: [],
  templateUrl: './profile-sittings-card.component.html',
  styleUrl: './profile-sittings-card.component.css',
})
export class ProfileSittingsCardComponent {
  iconClass = input.required<string>();
  iconContainerClass = input.required<string>();
  title = input.required<string>();
  text = input.required<string>();
}
