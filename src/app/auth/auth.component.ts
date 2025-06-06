import { Component, ComponentFactoryResolver, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, LoadingSpinnerComponent, PlaceholderDirective],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private componentFactoryResolver = inject(ComponentFactoryResolver);

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

    const sub = authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage: Error) => {
        console.log(errorMessage);
        this.error = errorMessage.message;
        this.showErrorAlert(errorMessage.message);
        this.isLoading = false;
      },
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    const sub = componentRef.instance.close.subscribe(() => {
      sub.unsubscribe();
      hostViewContainerRef.clear()
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
