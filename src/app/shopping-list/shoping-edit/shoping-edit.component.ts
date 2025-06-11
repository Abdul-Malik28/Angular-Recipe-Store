import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { State } from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shoping-edit',
  imports: [FormsModule],
  templateUrl: './shoping-edit.component.html',
  styleUrl: './shoping-edit.component.css'
})
export class ShopingEditComponent implements OnInit {
  @ViewChild('f') slForm!: NgForm;

  private destroyRef = inject(DestroyRef);
  private store = inject(Store<fromApp.AppState>);

  editMode = false;
  editedItem?: Ingredient;

  ngOnInit() {
    const subs = this.store.select('shoppingList').subscribe({
      next: (stateData: State) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem?.name,
            amount: this.editedItem?.amount,
          })
        } else {
          this.editMode = false;
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      subs.unsubscribe();
      this.store.dispatch(ShoppingListActions.stopEdit());
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = {
      id: Math.random().toString(),
      name: value.name,
      amount: value.amount,
    }

    if (this.editMode) {
      // this.slServie.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(ShoppingListActions.updateIngredient({ ingredient: newIngredient }));
    } else {
      // this.slServie.addIngredient(newIngredient);
      this.store.dispatch(ShoppingListActions.addIngredient({ payload: newIngredient }));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onDelete() {
    // this.slServie.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onClear();
  }
}
