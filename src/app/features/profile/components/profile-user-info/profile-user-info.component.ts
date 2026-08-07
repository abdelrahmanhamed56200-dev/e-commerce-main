import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-profile-user-info',
  imports: [],
  templateUrl: './profile-user-info.component.html',
  styleUrl: './profile-user-info.component.css',
})
export class ProfileUserInfoComponent {
  private readonly authService = inject(AuthService);

  id = computed(() => this.authService.userID());
  user = computed(() => this.authService.user()?.role);
}
