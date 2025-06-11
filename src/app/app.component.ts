import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // loadedFeature = 'recipe';

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
  private recipeService = inject(RecipeService);
  private dataStorageService = inject(DataStorageService);
  private authService = inject(AuthService);
  private store = inject(Store<fromApp.AppState>);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(AuthActions.autoLogin());

    this.recipeService.recipeAdded$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.dataStorageService.storeRecipes();
      });

    this.recipeService.recipeUpdated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.dataStorageService.storeRecipes();
      });
  }
}
