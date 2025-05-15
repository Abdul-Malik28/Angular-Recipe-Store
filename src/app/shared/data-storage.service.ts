import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private http = inject(HttpClient);
  private recipeService = inject(RecipeService);
  private authService = inject(AuthService);

  storeRecipes() {
    const recipes = this.recipeService.getRecipes;
    console.log(recipes());
    this.http.put<Recipe[]>('https://angular-recipe-store-59e1c-default-rtdb.firebaseio.com/recipes.json', recipes()).subscribe({
      next: (response) => {
        console.log(response);
        // this.recipeService.recipeChanged$.next(response);
        this.recipeService.setRecipes(response);
      }
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://angular-recipe-store-59e1c-default-rtdb.firebaseio.com/recipes.json',
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }),
    );
  }
}
