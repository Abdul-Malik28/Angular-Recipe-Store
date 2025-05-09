import { EventEmitter, inject, Injectable, Output } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  slService = inject(ShoppingListService);

  private recipes: Recipe[] = [
    {
      id: 'r1',
      name: 'A Test Recipe',
      description: 'This is a test',
      imagePath: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/coconut-squash-dhansak-818351d.jpg?quality=90&resize=500,454',
      ingredients: [
        {
          id: Math.random().toString(),
          name: 'Meat',
          amount: 1,
        }, {
          id: Math.random().toString(),
          name: 'French Fries',
          amount: 20,
        }
      ]
    },
    {
      id: 'r2',
      name: 'Another Test Recipe',
      description: 'This is a test',
      imagePath: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/coconut-squash-dhansak-818351d.jpg?quality=90&resize=500,454',
      ingredients: [
        {
          id: Math.random().toString(),
          name: 'Buns',
          amount: 2,
        }, {
          id: Math.random().toString(),
          name: 'Meat',
          amount: 1,
        },
      ]
    },
  ];

  getRecipes = [...this.recipes];

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
