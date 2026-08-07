import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent {
  pageTitle = input.required<string>();

  breadcrumbs = input<{ label: string; link: string; queryParams?: any }[]>();

  containerClass = input<string>('flex flex-wrap gap-1.5 text-sm font-medium');

  linkClass = input<string>('text-white/80 hover:text-white');

  separatorClass = input<string>('text-white/80');

  activeClass = input<string>('text-white');

  homeLink = input<string>('/');
  homeLabel = input<string>('Home');
}
