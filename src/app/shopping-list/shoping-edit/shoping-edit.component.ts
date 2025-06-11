import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { ADD_INGREDIENT } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shoping-edit',
  imports: [FormsModule],
  templateUrl: './shoping-edit.component.html',
  styleUrl: './shoping-edit.component.css'
})
export class ShopingEditComponent implements OnInit {
  @ViewChild('f') slForm!: NgForm;

  private slServie = inject(ShoppingListService);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store<{ shoppingList: { ingredients: Ingredient[] } }>);

  editMode = false;
  editedItemIndex!: number;
  editedItem?: Ingredient;

  ngOnInit() {
    const subs = this.slServie.startedEditing$.subscribe({
      next: (index) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slServie.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = {
      id: Math.random().toString(),
      name: value.name,
      amount: value.amount,
    }

    if (this.editMode) {
      this.slServie.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // this.slServie.addIngredient(newIngredient);
      this.store.dispatch(ADD_INGREDIENT({payload: newIngredient}));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slServie.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
