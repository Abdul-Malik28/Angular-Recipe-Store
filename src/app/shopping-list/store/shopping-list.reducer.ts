import { createReducer, on } from "@ngrx/store";

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from "../../shared/ingredient.model";

export type State = {
    ingredients: Ingredient[];
    editedIngredient?: Ingredient;
    editedIngredientIndex: number;
}

export type AppState = {
    shoppingList: State
}

const initialState: State = {
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
    ],
    editedIngredient: undefined,
    editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
    initialState,
    on(ShoppingListActions.addIngredient, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        };
    }),
    on(ShoppingListActions.addIngredients, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload],
        };
    }),
    on(ShoppingListActions.updateIngredient, (state, action) => {
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = {
            ...ingredient,
            ...action.ingredient
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

        return {
            ...state,
            ingredients: updatedIngredients,
            editedIngredientIndex: -1,
            editedIngredient: undefined
        };
    }),
    on(ShoppingListActions.deleteIngredient, (state, action) => {
        return {
            ...state,
            ingredients: state.ingredients.filter((ig, igIndex) => {
                return igIndex !== state.editedIngredientIndex;
            }),
            editedIngredientIndex: -1,
            editedIngredient: undefined
        };
    }),
    on(ShoppingListActions.startEdit, (state, action) => {
        return {
            ...state,
            editedIngredientIndex: action.payload,
            editedIngredient: { ...state.ingredients[action.payload] }
        };
    }),
    on(ShoppingListActions.stopEdit, (state, action) => {
        return {
            ...state,
            editedIngredient: undefined,
            editedIngredientIndex: -1
        };
    }),
);