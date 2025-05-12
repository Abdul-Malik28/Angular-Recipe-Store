import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  imports: [DropdownDirective],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  // @Input({ required: true }) recipe!: Recipe;
  recipe!: Recipe;
  id!: number;
  // @Input({ required: true }) id!: string;

  recipeService = inject(RecipeService);
  activatedRoute = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subs = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
    // this.recipe = this.recipeService.getRecipe(+this.id);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
