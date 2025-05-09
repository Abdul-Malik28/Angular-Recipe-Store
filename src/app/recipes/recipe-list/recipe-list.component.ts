import { Component, EventEmitter, inject, Output } from '@angular/core';

import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { Recipe } from '../recipe.modal';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipeService = inject(RecipeService);
  recipes: Recipe[] = this.recipeService.getRecipes;

}
