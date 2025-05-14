import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      error: (errorMessage: Error) => {
        console.log(errorMessage);
        this.error = errorMessage.message;
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
