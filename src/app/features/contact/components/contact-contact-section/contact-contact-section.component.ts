import { Component } from '@angular/core';
import { ContactContactInfoComponent } from '../contact-contact-info/contact-contact-info.component';
import { ContactFollowUsCardComponent } from '../contact-follow-us-card/contact-follow-us-card.component';

@Component({
  selector: 'app-contact-contact-section',
  imports: [ContactContactInfoComponent, ContactFollowUsCardComponent],
  templateUrl: './contact-contact-section.component.html',
  styleUrl: './contact-contact-section.component.css',
})
export class ContactContactSectionComponent {}
