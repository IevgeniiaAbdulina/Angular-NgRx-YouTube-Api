import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  isUserLoggedIn$ = this.authService.getIsLoggedIn$;
  isAdminLoggedIn$ = this.authService.isAdmin;

  constructor(private authService: AuthService) {}

  loginButtonHandler(): void {
    this.authService.navigateToLoginPage();
  }

  signOutButtonHandler(): void {
    this.authService.userSignOutHandler();
  }
}
