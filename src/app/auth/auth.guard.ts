import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store<fromApp.AppState>);

  // return authService.user$.pipe(
  return store.select('auth').pipe(
    take(1),
    map(authState => authState.user),    
    map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    }),
    // tap(isAuth => {
    //   if (!isAuth) {
    //     router.navigate(['/auth']);
    //   }
    // }),
  );
};
