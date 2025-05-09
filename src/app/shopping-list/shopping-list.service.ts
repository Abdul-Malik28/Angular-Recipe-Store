import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();
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

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit([...this.ingredients])
  }
}
