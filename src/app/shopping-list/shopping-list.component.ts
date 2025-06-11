import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { ShopingEditComponent } from "./shoping-edit/shoping-edit.component";
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  imports: [ShopingEditComponent, AsyncPipe],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private destroyRef = inject(DestroyRef);
  private store = inject(Store<fromApp.AppState>);

  constructor() {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnInit() {

    // this.ingredients = this.slService.getIngredients;

    // // this.slService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
    // //   this.ingredients = ingredients;
    // //   console.log(this.ingredients);
    // // });

    // const sub = this.slService.behaviorSubject$.subscribe({
    //   next: (ingredients) => {
    //     this.ingredients = ingredients;
    //   }
    // });

    // this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onEditItem(index: number) {
    // this.slService.startedEditing$.next(index)
    this.store.dispatch(ShoppingListActions.startEdit({payload: index}));
  }
}
