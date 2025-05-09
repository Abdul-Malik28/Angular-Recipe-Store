import { Component, inject, Input } from '@angular/core';
import { Recipe } from '../../recipe.modal';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input({ required: true }) recipe!: Recipe;

  recipeService = inject(RecipeService);

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
