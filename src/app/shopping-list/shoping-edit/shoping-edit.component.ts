import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shoping-edit',
  imports: [],
  templateUrl: './shoping-edit.component.html',
  styleUrl: './shoping-edit.component.css'
})
export class ShopingEditComponent {
  @ViewChild('nameInput') nameInputRef!: ElementRef;
  @ViewChild('amountInput') amountInputRef!: ElementRef;

  private slServie = inject(ShoppingListService);

  onAddItem() {
    const newIngredient: Ingredient = {
      id: Math.random().toString(),
      name: this.nameInputRef.nativeElement.value,
      amount: this.amountInputRef.nativeElement.value,
    }

    this.slServie.addIngredient(newIngredient);
  }
}
