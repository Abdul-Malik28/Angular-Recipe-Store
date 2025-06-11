import { createReducer, on } from "@ngrx/store";

import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export type State = {
    user: User | null
};

const initialState: State = {
    user: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, action) => {
        const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
        return {
            ...state,
            user
        };
    }),
    on(AuthActions.logout, (state, action) => {
        return {
            ...state,
            user: null
        }
    }),
);