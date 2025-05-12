import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  private recipeService = inject(RecipeService);
  recipes: Recipe[] = this.recipeService.getRecipes;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const sub = this.recipeService.recipeChanged$.subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onNewRecipe() {
    this.router.navigate(['new'], {
      relativeTo: this.activatedRoute
    });
  }

}
