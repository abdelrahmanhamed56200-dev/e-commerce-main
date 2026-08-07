import { Component } from '@angular/core';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { ContactContactSectionComponent } from '../../components/contact-contact-section/contact-contact-section.component';
import { ContactFormSectionComponent } from '../../components/contact-form-section/contact-form-section.component';

@Component({
  selector: 'app-contact-page',
  imports: [BreadcrumbsCardComponent, ContactContactSectionComponent, ContactFormSectionComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {}
