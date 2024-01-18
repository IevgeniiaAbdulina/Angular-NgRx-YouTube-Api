import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const authAdmin = !!localStorage.getItem('admin');
  if (authAdmin) {
    return true;
  }
  return router.navigate(['/']);
};
