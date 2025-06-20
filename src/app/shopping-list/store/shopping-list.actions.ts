import { createAction, props } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";

export const addIngredient = createAction(
    '[ShoppingList] Add Ingredient',
    props<{payload: Ingredient}>()
);

export const addIngredients = createAction(
    '[ShoppingList] Add Ingredients',
    props<{payload: Ingredient[]}>()
);

export const updateIngredient = createAction(
    '[ShoppingList] Update Ingredient',
    props<{ ingredient: Ingredient}>()
);

export const deleteIngredient = createAction(
    '[ShoppingList] Delete Ingredient'
);

export const startEdit = createAction(
    '[ShoppingList] Start Edit',
    props<{payload: number}>()
);

export const stopEdit = createAction(
    '[ShoppingList] Stop Edit'
);