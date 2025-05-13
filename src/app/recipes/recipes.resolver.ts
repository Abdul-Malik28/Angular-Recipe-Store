import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
    const dsService = inject(DataStorageService);
    return dsService.fetchRecipes();
}