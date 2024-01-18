import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const authToken = !!localStorage.getItem('token');
  if (authToken) {
    return true;
  }
  return router.navigate(['/auth']);
};
