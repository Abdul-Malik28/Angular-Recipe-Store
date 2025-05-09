import { Component, inject } from '@angular/core';
import { ShopingEditComponent } from "./shoping-edit/shoping-edit.component";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  imports: [ShopingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  slService = inject(ShoppingListService);
  ingredients: Ingredient[] = this.slService.getIngredients;

  

}
