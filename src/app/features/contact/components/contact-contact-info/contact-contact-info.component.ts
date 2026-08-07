import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-contact-info',
  imports: [],
  templateUrl: './contact-contact-info.component.html',
  styleUrl: './contact-contact-info.component.css',
})
export class ContactContactInfoComponent {
  contactInfo = [
    {
      iconClass: 'fa-solid fa-phone ',
      title: 'Phone',
      descriptions: ['Mon-Fri from 8am to 6pm'],
      links: [
        {
          url: 'tel:+18001234567',
          value: '+1 (800) 123-4567',
        },
      ],
    },
    {
      iconClass: 'fa-solid fa-envelope ',
      title: 'Email',
      descriptions: ["We'll respond within 24 hours"],
      links: [
        {
          url: 'mailto:support@freshcart.com',
          value: 'support@freshcart.com',
        },
      ],
    },
    {
      iconClass: 'fa-solid fa-location-dot ',
      title: 'Office',
      descriptions: ['123 Commerce Street', 'New York, NY 10001', 'United States'],
      links: [],
    },
    {
      iconClass: 'fa-solid fa-clock ',
      title: 'Business Hours',
      descriptions: ['Monday - Friday: 8am - 6pm', 'Saturday: 9am - 4pm', 'Sunday: Closed'],
      links: [],
    },
  ];
}
