import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  imports: [DropdownDirective],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  // @Input({ required: true }) recipe!: Recipe;
  recipe!: Recipe;
  // id!: number;
  @Input({ required: true }) set id(id: string) {
    this.recipe = this.recipeService.getRecipe(+id);
  }


  private recipeService = inject(RecipeService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  ngOnInit() {
    // const subs = this.activatedRoute.params.subscribe({
    //   next: (params) => {
    //     this.id = +params['id'];
    //     this.recipe = this.recipeService.getRecipe(this.id);
    //   }
    // });

    // this.destroyRef.onDestroy(() => subs.unsubscribe());
    // this.recipe = this.recipeService.getRecipe(+this.id);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
    });
    // this.router.navigate(['../', this.id, 'edit'], {
    //   relativeTo: this.activatedRoute,
    // });
  }
}
