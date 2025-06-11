import { createAction, props } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT = createAction(
    '[ShoppingList] ADD_INGREDIENT',
    props<{payload: Ingredient}>()
);

export const ADD_INGREDIENTS = createAction(
    '[ShoppingList] ADD_INGREDIENTS',
    props<{payload: Ingredient[]}>()
);

export const UPDATE_INGREDIENT = createAction(
    '[ShoppingList] UPDATE_INGREDIENTS',
    props<{payload: {index: number, ingredient: Ingredient}}>()
);

export const DELETE_INGREDIENTS = createAction(
    '[ShoppingList] DELETE_INGREDIENTS',
    props<{payload: number}>()
);