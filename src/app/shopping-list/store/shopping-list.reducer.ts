import { createReducer, on } from "@ngrx/store";

import { ADD_INGREDIENT } from './shopping-list.actions';
import { Ingredient } from "../../shared/ingredient.model";

const initialState: {
    ingredients: Ingredient[];
} = {
    ingredients: [
        {
            id: 'i1',
            name: 'Apples',
            amount: 5
        },
        {
            id: 'i2',
            name: 'Tomatoes',
            amount: 10
        },
    ]
};

export const shoppingListReducer = createReducer(
    initialState,
    on(ADD_INGREDIENT, (state, action) => {
        return {
            ...initialState,
            ingredients: [...initialState.ingredients, action.payload]
        };
    })
);