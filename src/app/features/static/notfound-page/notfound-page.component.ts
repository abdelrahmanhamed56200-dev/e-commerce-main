import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound-page',
  imports: [RouterLink],
  templateUrl: './notfound-page.component.html',
  styleUrl: './notfound-page.component.css',
})
export class NotfoundPageComponent {
  private readonly location = inject(Location);

  onBack() {
    this.location.back();
  }
}
