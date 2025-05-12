import { Component, DestroyRef, inject, OnInit } from '@angular/core';

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [RecipeListComponent, RouterOutlet],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  selectedRecipe?: Recipe;

  private destroyRef = inject(DestroyRef);
  private recipeService = inject(RecipeService);

  ngOnInit() {
    const subs = this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }
}
