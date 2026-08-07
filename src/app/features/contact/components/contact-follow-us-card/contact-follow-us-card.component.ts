import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-follow-us-card',
  imports: [],
  templateUrl: './contact-follow-us-card.component.html',
  styleUrl: './contact-follow-us-card.component.css',
})
export class ContactFollowUsCardComponent {
  socialLinks = [
    {
      name: 'Facebook',
      iconClass: 'fa-brands fa-facebook-f',
      link: '#',
    },
    {
      name: 'Twitter',
      iconClass: 'fa-brands fa-x-twitter',
      link: '#',
    },
    {
      name: 'Instagram',
      iconClass: 'fa-brands fa-instagram',
      link: '#',
    },
    {
      name: 'LinkedIn',
      iconClass: 'fa-brands fa-linkedin-in',
      link: '#',
    },
  ];
}
