import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();
  const isAuthPage = state.url === '/auth/login' || state.url === '/auth/register';

  if (!isLoggedIn) {
    if (isAuthPage) return true;
    router.navigate(['/auth/login']);
    return false;
  } else {
    if (isAuthPage) {
      router.navigate(['/destinations']);
      return false;
    }
    return true;
  }
};
