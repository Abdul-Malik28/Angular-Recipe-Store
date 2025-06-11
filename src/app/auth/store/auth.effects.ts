import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private router = inject(Router);

    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginStart),
        switchMap((authData) => {
            return this.http.post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return AuthActions.login({ payload: {email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate}});
                }),
                catchError(errorRes => {
                    let errorMsg = 'An unknown error occurred!';
                        console.log(errorRes);
                    
                        const firebaseErrorMessage = errorRes.error?.error?.message || errorRes.error?.message;
                    
                        if (!firebaseErrorMessage) {
                          return of(AuthActions.loginFail({payload : errorMsg}))
                        }
                    
                        switch (firebaseErrorMessage) {
                          case 'EMAIL_EXISTS':
                            errorMsg = 'This email already exists.';
                            break;
                          case 'EMAIL_NOT_FOUND':
                            errorMsg = 'This email does not exist.';
                            break;
                          case 'INVALID_PASSWORD':
                            errorMsg = 'This password is incorrect.';
                            break;
                          case 'INVALID_LOGIN_CREDENTIALS':
                            errorMsg = 'Invalid email or password.';
                            break;
                        }

                    return of(AuthActions.loginFail({payload : errorMsg}));
                })
            )
        })
    ));

    authSuccess = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => {
            this.router.navigate(['/']);
        })
    ), {dispatch: false});
}