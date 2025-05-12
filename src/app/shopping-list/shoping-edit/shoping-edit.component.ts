import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shoping-edit',
  imports: [FormsModule],
  templateUrl: './shoping-edit.component.html',
  styleUrl: './shoping-edit.component.css'
})
export class ShopingEditComponent {

  private slServie = inject(ShoppingListService);

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = {
      id: Math.random().toString(),
      name: value.name,
      amount: value.amount,
    }

    this.slServie.addIngredient(newIngredient);
  }
}
