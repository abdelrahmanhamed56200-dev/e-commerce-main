import { Component, input } from '@angular/core';

@Component({
  selector: 'app-static-notice-card',
  imports: [],
  templateUrl: './static-notice-card.component.html',
  styleUrl: './static-notice-card.component.css',
})
export class StaticNoticeCardComponent {
  icon = input.required<string>();
  title = input.required<string>();
  text = input.required<string>();
  mainColor = input<'primary' | 'success' | 'danger' | 'amber'>('primary');

  colorMap = {
    primary: {
      wrapper: 'bg-primary-50 border-primary-200',
      icon: 'bg-primary-500',
    },
    success: {
      wrapper: 'bg-green-50 border-green-200',
      icon: 'bg-green-500',
    },
    danger: {
      wrapper: 'bg-red-50 border-red-200',
      icon: 'bg-red-500',
    },
    amber: {
      wrapper: 'bg-amber-50 border-amber-200',
      icon: 'bg-amber-500',
    },
  };
}
