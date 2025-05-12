import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // ingredientChanged = new EventEmitter<Ingredient[]>();
  startedEditing$ = new Subject<number>();
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

  getIngredient(index: number) {
    return this.ingredients[index];
  }

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

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.behaviorSubject$.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.behaviorSubject$.next(this.ingredients.slice());
  }
}
