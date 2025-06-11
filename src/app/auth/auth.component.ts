import { Component, ComponentFactoryResolver, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { Store } from '@ngrx/store';

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { State } from './store/auth.reducer';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, LoadingSpinnerComponent, PlaceholderDirective],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  private destroyRef = inject(DestroyRef);
  private store = inject(Store<fromApp.AppState>);
  private componentFactoryResolver = inject(ComponentFactoryResolver);

  ngOnInit(){
    const storeSub = this.store.select('auth').subscribe({
      next: (authState: State) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if(this.error){
          this.showErrorAlert(this.error);
        }
      }
    });
    this.destroyRef.onDestroy(() => storeSub.unsubscribe());
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;


    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.loginStart({payload: {email, password}}));
    } else {    
      this.store.dispatch(AuthActions.signupStart({payload: {email, password}}));
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
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
