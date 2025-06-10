import { createAction, props } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT = createAction(
    '[ShoppingList] ADD_INGREDIENT',
    props<{payload: Ingredient}>()
);