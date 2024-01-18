import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isLoggedIn status to true when user is logged in', () => {
    service.userLoginHandler();
    service.getIsLoggedIn$.subscribe(status => {
      expect(status).toBeTruthy();
    });
  });

  it('should navigate to the [/video] route when the user is logged in', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    service.userLoginHandler();

    expect(navigateSpy).toHaveBeenCalledWith('/video');
  });

  it('should navigate to the login page when user is logged out', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    service.userSignOutHandler();

    expect(navigateSpy).toHaveBeenCalledWith('/auth');
  });

  it('should set isLoggedIn status to false when user is logged out', () => {
    service.userSignOutHandler();
    service.getIsLoggedIn$.subscribe(status => {
      expect(status).toBeFalsy();
    });
  });

  it('isAdminRole() should set isAdmin status', () => {
    const expectedStatus = true;
    const setData = {
      email: 'admin@admin',
      password: '12345678'
    };
    service.isAdminRole(setData);

    service.getIsAdmin$.subscribe(status => {
      expect(status).toEqual(expectedStatus);
    });
  });
});
