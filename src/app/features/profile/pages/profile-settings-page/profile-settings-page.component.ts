import { Component } from '@angular/core';
import { ProfileSittingsHeaderComponent } from '../../components/profile-sittings-header/profile-sittings-header.component';
import { ProfileSittingsCardComponent } from '../../components/profile-sittings-card/profile-sittings-card.component';
import { ProfilePasswordFormComponent } from '../../components/profile-password-form/profile-password-form.component';
import { ProfileInfoFormComponent } from '../../components/profile-info-form/profile-info-form.component';
import { ProfileUserInfoComponent } from '../../components/profile-user-info/profile-user-info.component';

@Component({
  selector: 'app-profile-settings-page',
  imports: [
    ProfileSittingsHeaderComponent,
    ProfileSittingsCardComponent,
    ProfilePasswordFormComponent,
    ProfileInfoFormComponent,
    ProfileUserInfoComponent,
  ],
  templateUrl: './profile-settings-page.component.html',
  styleUrl: './profile-settings-page.component.css',
})
export class ProfileSettingsPageComponent {}
