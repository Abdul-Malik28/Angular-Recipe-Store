import { Component, Input } from '@angular/core';

import { Recipe } from '../recipe.modal';
import { DropdownDirective } from '../../shared/dropdown.directive';

@Component({
  selector: 'app-recipe-detail',
  imports: [DropdownDirective],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  @Input({ required: true }) recipe!: Recipe;
}
