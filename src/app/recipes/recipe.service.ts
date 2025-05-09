import { EventEmitter, Injectable, Output } from '@angular/core';

import { Recipe } from './recipe.modal';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    {
      id: 'r1',
      name: 'A Test Recipe',
      description: 'This is a test',
      imagePath: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/coconut-squash-dhansak-818351d.jpg?quality=90&resize=500,454'
    },
    {
      id: 'r2',
      name: 'Another Test Recipe',
      description: 'This is a test',
      imagePath: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/coconut-squash-dhansak-818351d.jpg?quality=90&resize=500,454'
    },
  ];

  getRecipes = [...this.recipes];
}
