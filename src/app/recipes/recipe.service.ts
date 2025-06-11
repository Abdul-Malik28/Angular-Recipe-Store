import { computed, inject, Injectable, Output, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
// import { DataStorageService } from '../shared/data-storage.service';
import  *  as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected$ = new Subject<Recipe>();
  recipeAdded$ = new Subject<void>();
  recipeUpdated$ = new Subject<void>();

  private lastId = 0;

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


  // private recipes: Recipe[] = []
  private recipes = signal<Recipe[]>([]);
  // recipeChanged$ = new BehaviorSubject<Recipe[]>(this.recipes);

  // getRecipes() {
  //   return this.recipes().slice();
  // }

  private store = inject(Store<fromApp.AppState>);

  getRecipes = this.recipes.asReadonly();

  setRecipes(recipes: Recipe[]) {
    this.recipes.set(recipes);

    const maxId = recipes.reduce((max, recipe) => {
      const idNum = parseInt(recipe.id?.replace('r', ''), 10);
      return !isNaN(idNum) && idNum > max ? idNum : max;
    }, 0);

    this.lastId = maxId;
  }


  getRecipe(id: string) {
    return computed(() => this.recipes().find(r => r.id === id));
  }

  addIngredientsToShoppingList(ingredients?: Ingredient[]) {
    if (!ingredients) {
      return;
    }
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(ShoppingListActions.addIngredients({payload: ingredients}));
  }

  addRecipe(recipe: Omit<Recipe, 'id'>) {
    this.lastId++; // increment
    const newRecipe: Recipe = {
      ...recipe,
      id: `r${this.lastId}`, // assign auto ID
    };

    this.recipes.update(old => [...old, newRecipe]);
    this.recipeAdded$.next();
  }


  updateRecipe(id: string, newRecipe: Recipe) {
    const updatedRecipes = this.recipes().map(recipe => {
      if (recipe.id === id) {
        return { ...newRecipe, id: recipe.id };
      }
      return recipe;
    });

    this.recipes.set(updatedRecipes);

    this.recipeUpdated$.next();
  }


  deleteRecipe(index: number) {
    this.recipes().splice(index, 1);
    // this.recipeChanged$.next(this.recipes.slice());
  }
}
