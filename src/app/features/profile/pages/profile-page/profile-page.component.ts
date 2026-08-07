import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { ProfileSidebarComponent } from '../../components/profile-sidebar/profile-sidebar.component';

@Component({
  selector: 'app-profile-page',
  imports: [BreadcrumbsCardComponent, RouterOutlet, ProfileSidebarComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {}
