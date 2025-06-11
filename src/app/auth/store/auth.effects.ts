import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.authenticateSuccess({ payload: { email, userId, token, expirationDate } });
};

const handleError = (errorRes: any) => {
    let errorMsg = 'An unknown error occurred!';
    console.log(errorRes);

    const firebaseErrorMessage = errorRes.error?.error?.message || errorRes.error?.message;

    if (!firebaseErrorMessage) {
        return of(AuthActions.authenticateFail({ payload: errorMsg }))
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

    return of(AuthActions.authenticateFail({ payload: errorMsg }));
};

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private router = inject(Router);
    private authService = inject(AuthService);

    authSignup = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.signupStart),
        switchMap((signupAction) => {
            return this.http.post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
            )
        })
    ));

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
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
            )
        })
    ));

    authRedirect = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap(() => {
            this.router.navigate(['/']);
        })
    ), { dispatch: false });

    autoLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.autoLogin),
        map(() => {
            const userData: string | null = localStorage.getItem('userData');
            if (!userData || userData === null) {
                return {type: 'DUMMY'};
            }

            if (userData !== null) {
                const actualUser: {
                    email: string;
                    id: string;
                    _token: string;
                    _tokenExpirationDate: string;
                } = JSON.parse(userData);
                const loadeduser = new User(actualUser.email, actualUser.id, actualUser._token, new Date(actualUser._tokenExpirationDate));

                if (loadeduser.token) {  
                    const expirationDuration = new Date(actualUser._tokenExpirationDate).getTime() - new Date().getTime();

                    this.authService.setLogoutTimer(expirationDuration);                
                   return AuthActions.authenticateSuccess({ payload: { email: loadeduser.email, userId: loadeduser.id, token: loadeduser.token, expirationDate: new Date(actualUser._tokenExpirationDate) } });                    
                }
            }
            return {type: 'DUMMY'};
        })
    ));

    authLogout = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    ), { dispatch: false });
}