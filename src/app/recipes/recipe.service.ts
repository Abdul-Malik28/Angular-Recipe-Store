import { inject, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected$ = new Subject<Recipe>();

  slService = inject(ShoppingListService);

  // private recipes: Recipe[] = [
  //   {
  //     id: 'r1',
  //     name: 'Tasty Vegitable Suip',
  //     description: 'A super tasty Suip! - justawesome',
  //     imagePath: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/coconut-squash-dhansak-818351d.jpg?quality=90&resize=500,454',
  //     ingredients: [
  //       {
  //         id: Math.random().toString(),
  //         name: 'Meat',
  //         amount: 1,
  //       }, {
  //         id: Math.random().toString(),
  //         name: 'French Fries',
  //         amount: 20,
  //       }
  //     ]
  //   },
  //   {
  //     id: 'r2',
  //     name: 'Big Fat Burger',
  //     description: 'What else you need to say?',
  //     imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5rhBjk7N-QdJu6KFytIl8ow_ZOH9e0-6Vg&s',
  //     ingredients: [
  //       {
  //         id: Math.random().toString(),
  //         name: 'Buns',
  //         amount: 2,
  //       }, {
  //         id: Math.random().toString(),
  //         name: 'Meat',
  //         amount: 1,
  //       },
  //     ]
  //   },
  // ];

  private recipes: Recipe[] = []
  recipeChanged$ = new BehaviorSubject<Recipe[]>(this.recipes);

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    console.log(this.recipes);
    this.recipes = recipes;
    this.recipeChanged$.next(this.recipes.slice());
    console.log(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients?: Ingredient[]) {
    if (!ingredients) {
      return;
    }
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged$.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged$.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged$.next(this.recipes.slice());
  }
}
