import { inject, Signal } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import { Observable } from "rxjs";

export const recipesResolver: ResolveFn<Signal<Recipe[]> | Observable<Recipe[]>> = (route, state) => {
    const dsService = inject(DataStorageService);
    const recipeService = inject(RecipeService);
    const recipes = recipeService.getRecipes;

    if (recipes.length === 0) {
        return dsService.fetchRecipes();
    }
    return recipes;
}