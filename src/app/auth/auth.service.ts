import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbhNCzV99bLbpNcxLHXl4_XK8L1biue74',
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.handleError),
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbhNCzV99bLbpNcxLHXl4_XK8L1biue74',
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    console.log(errorRes);

    const firebaseErrorMessage = errorRes.error?.error?.message || errorRes.error?.message;

    if (!firebaseErrorMessage) {
      return throwError(() => new Error(errorMsg));
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

    return throwError(() => new Error(errorMsg));
  }




}
