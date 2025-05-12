import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    {
      id: 'i1',
      name: 'Apples',
      amount: 5
    },
    {
      id: 'i2',
      name: 'Tomatoes',
      amount: 10
    },
  ];

  getIngredients = [...this.ingredients];

  behaviorSubject$ = new BehaviorSubject<Ingredient[]>(this.getIngredients);  

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.behaviorSubject$.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }

    this.ingredients.push(...ingredients);
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.behaviorSubject$.next(this.ingredients.slice());
  }
}
