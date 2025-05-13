import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private http = inject(HttpClient);
  private recipeService = inject(RecipeService);

  storeRecipes() {
    const recipes = this.recipeService.getRecipes;
    this.http.put('https://angular-recipe-store-59e1c-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe({
      next: response => console.log(response)
    });
  }

  fetchRecipes() {
    // const recipes = this.recipeService.getRecipes;
    this.http.get<Recipe[]>('https://angular-recipe-store-59e1c-default-rtdb.firebaseio.com/recipes.json').subscribe({
      next: (recipes) => {
        this.recipeService.setRecipes(recipes);
      }
    });
  }
}
