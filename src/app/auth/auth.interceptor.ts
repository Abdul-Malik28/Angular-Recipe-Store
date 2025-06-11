import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { exhaustMap, take, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const store = inject(Store<fromApp.AppState>);

  // return authService.user$.pipe(
  return store.select('auth').pipe(
    take(1),
    map(authState => {
      return authState.user;
    }),
    exhaustMap((user) => {

      if (!user) {
        return next(req);
      }

      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user?.token ?? ''),
      });
      return next(modifiedReq);
    }));
};
