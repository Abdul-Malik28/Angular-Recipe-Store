import { Component } from '@angular/core';
import { ShopingEditComponent } from "./shoping-edit/shoping-edit.component";
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  imports: [ShopingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    {
      id: 'i1',
      name: 'Apples',
      amount: 5
    },
    {
      id: 'i2',
      name: 'Tomatoes',
      amount: 10
    },
  ];

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
