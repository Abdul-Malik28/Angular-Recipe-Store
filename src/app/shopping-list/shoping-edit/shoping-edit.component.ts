import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
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

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    this.ingredientAdded.emit({
      id: Math.random().toString(),
      name: ingName,
      amount: ingAmount
    });
  }
}
