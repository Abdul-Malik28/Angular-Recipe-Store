import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';

import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.user$.pipe(
    take(1),
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
