import { createReducer, on } from "@ngrx/store";

import * as ShoppingListActions from './shopping-list.actions';
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
    on(ShoppingListActions.ADD_INGREDIENT, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        };
    }),
    on(ShoppingListActions.ADD_INGREDIENTS, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload],
        };
    }),
    on(ShoppingListActions.UPDATE_INGREDIENT, (state, action) => {
        const ingredient = state.ingredients[action.payload.index];
        const updatedIngredient = {
            ...ingredient,
            ...action.payload.ingredient
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.payload.index] = updatedIngredient;

        return {
            ...state,
            ingredients: updatedIngredients
        };
    }),
    on(ShoppingListActions.DELETE_INGREDIENTS, (state, action) => {
        return {
            ...state,
            ingredients: state.ingredients.filter((ig, igIndex) => {
                return igIndex !== action.payload;
            })
        };
    }),
);