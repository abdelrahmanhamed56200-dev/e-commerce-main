import { Component, signal } from '@angular/core';
import { BreadcrumbsCardComponent } from '../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { StaticNoticeCardComponent } from '../components/static-notice-card/static-notice-card.component';
import { StaticInfoCardComponent } from '../components/static-info-card/static-info-card.component';
import { StaticPrivacyAndTermActionButtonsComponent } from '../components/static-privacy-and-term-action-buttons/static-privacy-and-term-action-buttons.component';

@Component({
  selector: 'app-terms-and-conditions-page',
  imports: [
    BreadcrumbsCardComponent,
    StaticNoticeCardComponent,
    StaticInfoCardComponent,
    StaticPrivacyAndTermActionButtonsComponent,
  ],
  templateUrl: './terms-and-conditions-page.component.html',
  styleUrl: './terms-and-conditions-page.component.css',
})
export class TermsAndConditionsPageComponent {
  termsAndConditions = signal({
    notice: {
      title: 'Important Notice',
      text: 'By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.',
      icon: 'fa-solid fa-file-contract',
    },
    articles: [
      {
        title: 'Acceptance of Terms',
        icon: 'fa-solid fa-handshake',
        sections: [
          {
            content:
              'By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.',
          },
          {
            content: 'If you do not agree to these Terms, you must not access or use the Service.',
          },
          {
            content:
              'We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.',
          },
        ],
      },
      {
        title: 'User Eligibility',
        icon: 'fa-solid fa-user-check',
        sections: [
          {
            content:
              'The Service is intended for users who are at least eighteen (18) years of age.',
          },
          {
            content:
              'By using the Service, you represent and warrant that you are of legal age to form a binding contract.',
          },
          {
            content:
              'If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.',
          },
        ],
      },
      {
        title: 'Account Registration',
        icon: 'fa-solid fa-id-cart',
        sections: [
          {
            content:
              'You may be required to create an account to access certain features of the Service.',
          },
          {
            content:
              'You agree to provide accurate, current, and complete information during registration.',
          },
          {
            content:
              'You are solely responsible for maintaining the confidentiality of your account credentials.',
          },
          {
            content: 'You agree to notify us immediately of any unauthorized use of your account.',
          },
        ],
      },
      {
        title: 'Orders and Payments',
        icon: 'fa-solid fa-credit-cart',
        sections: [
          {
            content:
              'All orders placed through the Service are subject to acceptance and availability.',
          },
          {
            content: 'Prices are subject to change without notice prior to order confirmation.',
          },
          {
            content:
              'Payment must be made in full at the time of purchase through approved payment methods.',
          },
          {
            content: 'We reserve the right to refuse or cancel any order at our sole discretion.',
          },
        ],
      },
      {
        title: 'Shipping and Delivery',
        icon: 'fa-solid fa-truck',
        sections: [
          {
            content: 'Shipping times are estimates only and are not guaranteed.',
          },
          {
            content:
              'Risk of loss and title for items purchased pass to you upon delivery to the carrier.',
          },
          {
            content:
              'We are not responsible for delays caused by carriers, customs, or other factors beyond our control.',
          },
        ],
      },
      {
        title: 'Returns and Refunds',
        icon: 'fa-solid fa-arrow-rotate-left',
        sections: [
          {
            content: 'Our return policy allows returns within 14 days of delivery for most items.',
          },
          {
            content: 'Products must be unused and in original packaging.',
          },
          {
            content:
              'Refunds will be processed within 5-7 business days after receiving the returned item.',
          },
        ],
      },
      {
        title: 'Limitation of Liability',
        icon: 'fa-solid fa-scale-balanced',
        sections: [
          {
            content:
              'To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.',
          },
        ],
      },
      {
        title: 'Contact Us',
        icon: 'fa-solid fa-envelope',
        sections: [
          {
            content:
              'If you have any questions about these Terms, please contact us at support@freshcart.com',
          },
        ],
      },
    ],
  });
}
