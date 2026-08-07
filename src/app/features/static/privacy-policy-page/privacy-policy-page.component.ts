import { Component, signal } from '@angular/core';
import { BreadcrumbsCardComponent } from '../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { StaticNoticeCardComponent } from '../components/static-notice-card/static-notice-card.component';
import { StaticInfoCardComponent } from '../components/static-info-card/static-info-card.component';
import { StaticPrivacyAndTermActionButtonsComponent } from '../components/static-privacy-and-term-action-buttons/static-privacy-and-term-action-buttons.component';

@Component({
  selector: 'app-privacy-policy-page',
  imports: [
    BreadcrumbsCardComponent,
    StaticNoticeCardComponent,
    StaticInfoCardComponent,
    StaticPrivacyAndTermActionButtonsComponent,
  ],
  templateUrl: './privacy-policy-page.component.html',
  styleUrl: './privacy-policy-page.component.css',
})
export class PrivacyPolicyPageComponent {
  privacyPolicy = signal({
    notice: {
      title: 'Your Privacy Matters',
      text: 'Your Privacy Matters This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.',
      icon: 'fa-solid fa-shield-halved',
    },
    articles: [
      {
        title: 'Information We Collect',
        icon: 'fa-solid fa-database',
        sections: [
          {
            title: 'Personal Data:',
            content: 'Name, email address, phone number, and shipping address.',
          },
          {
            title: 'Payment Data:',
            content: 'Credit card information processed securely through our payment providers.',
          },
          {
            title: 'Technical Data:',
            content: 'IP address, browser type, device information, and access times.',
          },
          {
            title: 'Usage Data:',
            content: 'Pages viewed, products browsed, and actions taken within our platform.',
          },
        ],
      },
      {
        title: 'How We Use Your Information',
        icon: 'fa-solid fa-user-shield',
        sections: [
          {
            content: 'To process and fulfill your orders.',
          },
          {
            content: 'To send order confirmations and shipping updates.',
          },
          {
            content: 'To provide customer support and respond to inquiries.',
          },
          {
            content: 'To improve our products, services, and user experience.',
          },
          {
            content: 'To send promotional communications (with your consent).',
          },
        ],
      },
      {
        title: 'Data Protection',
        icon: 'fa-solid fa-lock',
        sections: [
          {
            content: 'We implement industry-standard encryption (SSL/TLS) for all data transfers.',
          },
          {
            content: 'Payment information is processed by PCI-compliant payment providers.',
          },
          {
            content: 'We conduct regular security audits and vulnerability assessments.',
          },
          {
            content: 'Access to personal data is restricted to authorized personnel only.',
          },
        ],
      },
      {
        title: 'Information Sharing',
        icon: 'fa-solid fa-share-nodes',
        sections: [
          {
            content: 'We do not sell, trade, or rent your personal information to third parties.',
          },
          {
            content:
              'We may share data with trusted service providers who assist in our operations.',
          },
          {
            content: 'We may disclose information when required by law or to protect our rights.',
          },
        ],
      },
      {
        title: 'Your Rights',
        icon: 'fa-solid fa-user-check',
        sections: [
          {
            title: 'Access:',
            content: 'Request a copy of your personal data.',
          },
          {
            title: 'Rectification:',
            content: 'Request correction of inaccurate data.',
          },
          {
            title: 'Erasure:',
            content: 'Request deletion of your personal data.',
          },
          {
            title: 'Portability:',
            content: 'Request your data in a portable format.',
          },
          {
            title: 'Opt:-out',
            content: 'Unsubscribe from marketing communications at any time.',
          },
        ],
      },

      {
        title: 'Cookies',
        icon: 'fa-solid fa-cookie',
        sections: [
          {
            content: 'We use cookies to enhance your browsing experience and remember preferences.',
          },
          {
            content: 'You can control cookie settings through your browser preferences.',
          },
          {
            content: 'Disabling cookies may affect the functionality of certain features.',
          },
        ],
      },
      {
        title: 'Data Retention',
        icon: 'fa-solid fa-clock',
        sections: [
          {
            content:
              'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.',
          },
        ],
      },
      {
        title: 'Contact Us',
        icon: 'fa-solid fa-envelope',
        sections: [
          {
            content:
              'For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at privacy@freshcard.com',
          },
        ],
      },
    ],
  });
}
