import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import * as fromApp from './store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(fromApp.appReducers),
    provideEffects([AuthEffects])
]
};
