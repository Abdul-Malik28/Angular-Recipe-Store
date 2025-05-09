import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

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
  }
}
