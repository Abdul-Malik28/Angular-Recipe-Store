import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  editMode = false;
  // @Input()
  // set id(id: string) {
  //   this.editMode = id != null;
  //   console.log(this.editMode);
  //   console.log(id);
  //   this.initForm();
  // }

  recipeForm!: FormGroup;
  private recipeService = inject(RecipeService);

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    });
  }

  onSubmit() {
    // const newRecipe: Recipe = {
    //   id: Math.random().toString(),
    //   name: this.recipeForm.value['name'],
    //   description: this.recipeForm.value['description'],
    //   imagePath: this.recipeForm.value['imagePath'],
    //   ingredients: this.recipeForm.value['imagePath'],
    // };
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, newRecipe);
    // } else {
    //   this.recipeService.addRecipe(newRecipe);
    // }

    // --- or --- //

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([] as FormGroup[]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(+this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
