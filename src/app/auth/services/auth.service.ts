import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  getIsLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  isAdmin = new BehaviorSubject<boolean>(!!localStorage.getItem('admin'));
  getIsAdmin$: Observable<boolean> = this.isAdmin.asObservable();

  constructor(private router: Router) {}

  navigateToLoginPage(): void {
    this.router.navigateByUrl('/auth');
  }

  userLoginHandler(): void {
    const authToken = this.createAuthToken();

    localStorage.setItem('token', `${authToken}`);

    this.setIsLoggedIn();
    this.router.navigateByUrl('/video');
  }

  userSignOutHandler(): void {
    this.navigateToLoginPage();
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.setIsLoggedIn();
  }

  public createAuthToken(): number {
    return Math.floor(Math.random() * 10000);
  }

  public setIsLoggedIn(): void {
    const authCheck = !!localStorage.getItem('token');
    this.isLoggedIn.next(authCheck);
  }

  isAdminRole(value: { email: string; password: string }): void {
    if (value.email === 'admin@admin') {
      localStorage.setItem('admin', 'true');
      this.isAdmin.next(true);
      this.router.navigateByUrl('/admin');
    }
  }
}
