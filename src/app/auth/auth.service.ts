import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

// export interface AuthResponseData {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // private http = inject(HttpClient);
    // private router = inject(Router);
  private store = inject(Store<fromApp.AppState>);

  //// user$ = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  // signup(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
  //     { email, password, returnSecureToken: true }
  //   ).pipe(
  //     catchError(this.handleError),
  //     tap({
  //       next: (resData) => {
  //         this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
  //       }
  //     }),
  //   );
  // }

  // login(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
  //     { email, password, returnSecureToken: true }
  //   ).pipe(
  //     catchError(this.handleError),
  //     tap({
  //       next: (resData) => {
  //         this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
  //       }
  //     }),
  //   );
  // }

  // autoLogin() {
  //   const userData: string | null = localStorage.getItem('userData');
  //   if (!userData || userData === null) {
  //     return;
  //   }

  //   if (userData !== null) {
  //     const actualUser: {
  //       email: string;
  //       id: string;
  //       _token: string;
  //       _tokenExpirationDate: string;
  //     } = JSON.parse(userData);
  //     const loadeduser = new User(actualUser.email, actualUser.id, actualUser._token, new Date(actualUser._tokenExpirationDate));

  //     if (loadeduser.token) {
  //       // this.user$.next(loadeduser);
  //       this.store.dispatch(AuthActions.authenticateSuccess({ payload: { email: loadeduser.email, userId: loadeduser.id, token: loadeduser.token, expirationDate: new Date(actualUser._tokenExpirationDate) } }));
  //       const expirationDuration = new Date(actualUser._tokenExpirationDate).getTime() - new Date().getTime();
  //       this.autoLogout(expirationDuration);
  //     }
  //   }
  // }

  // logout() {
  //   // this.user$.next(null);
  //   this.store.dispatch(AuthActions.logout());
  //   // this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }

  // autoLogout(expirationDuration: number) {
  setLogoutTimer(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  clearLogoutTimer(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   // this.user$.next(user);
  //   this.store.dispatch(AuthActions.authenticateSuccess({payload: {email, userId, token, expirationDate}}));
  //   this.autoLogout(expiresIn * 1000);

  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMsg = 'An unknown error occurred!';
  //   console.log(errorRes);

  //   const firebaseErrorMessage = errorRes.error?.error?.message || errorRes.error?.message;

  //   if (!firebaseErrorMessage) {
  //     return throwError(() => new Error(errorMsg));
  //   }

  //   switch (firebaseErrorMessage) {
  //     case 'EMAIL_EXISTS':
  //       errorMsg = 'This email already exists.';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMsg = 'This email does not exist.';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMsg = 'This password is incorrect.';
  //       break;
  //     case 'INVALID_LOGIN_CREDENTIALS':
  //       errorMsg = 'Invalid email or password.';
  //       break;
  //   }

  //   return throwError(() => new Error(errorMsg));
  // }




}
