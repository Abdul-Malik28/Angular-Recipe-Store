import { Component, DestroyRef, inject, OnInit } from '@angular/core';

import { ShopingEditComponent } from "./shoping-edit/shoping-edit.component";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  imports: [ShopingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  slService = inject(ShoppingListService);
  ingredients?: Ingredient[];
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.ingredients = this.slService.getIngredients;

    // this.slService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    //   console.log(this.ingredients);
    // });

    const sub = this.slService.behaviorSubject$.subscribe({
      next: (ingredients) => {
        this.ingredients = ingredients;
      }
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
