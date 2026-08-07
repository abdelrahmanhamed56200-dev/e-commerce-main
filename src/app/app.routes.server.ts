import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'privacy',
    renderMode: RenderMode.Prerender, //ssg  stack pages
  },
  {
    path: 'terms',
    renderMode: RenderMode.Prerender, //ssg  stack pages
  },
  {
    path: 'notFound',
    renderMode: RenderMode.Prerender, //ssg  stack pages
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client, //csr
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client, //csr
  },
  {
    path: 'allorders',
    renderMode: RenderMode.Client, //csr
  },
  {
    path: '**',
    // renderMode: RenderMode.Prerender, //ssg  stack pages
    // renderMode: RenderMode.Client, //csr
    renderMode: RenderMode.Server,
  },
];
