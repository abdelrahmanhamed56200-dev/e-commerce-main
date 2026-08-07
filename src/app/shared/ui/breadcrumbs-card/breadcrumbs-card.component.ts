import { Component, input } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-breadcrumbs-card',
  templateUrl: './breadcrumbs-card.component.html',
  styleUrl: './breadcrumbs-card.component.css',
  imports: [BreadcrumbsComponent],
})
export class BreadcrumbsCardComponent {
  breadcrumbs = input<{ label: string; link: string }[]>();

  title = input.required<string>();

  description = input.required<string>();
  pageTitle = input.required<string>();

  iconClass = input<string>('bg-white/20');
  iconConfig = input.required<{ type: 'icon' | 'img'; value: string }>();

  titleClass = input<string>('text-white');
  containerClass = input<string>('bg-primary-500');
  descriptionClass = input<string>('text-white/80');
  breadcrumbsClass = input<string>('text-white/80');

  // breadcrumbs inputs
  linkClass = input<string>('text-white/80 hover:text-white');
  separatorClass = input<string>('text-white/80');
  activeLinkClass = input<string>('text-white');
}
