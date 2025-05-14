import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
      catchError(
        (errorRes) => {
          let errorMsg = 'An unknown error occured!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMsg = 'This email exist already';
          }
          return throwError(errorMsg);
        }
      ),
    );
  }
}
