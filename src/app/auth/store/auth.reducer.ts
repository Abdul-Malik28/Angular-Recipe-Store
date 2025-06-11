import { createReducer, on } from "@ngrx/store";

import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export type State = {
    user: User | null,
    authError: string;
    loading: boolean
};

const initialState: State = {
    user: null,
    authError: '',
    loading: false
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, action) => {
        const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
        return {
            ...state,
            authError: '',
            user,
            loading: false
        };
    }),
    on(AuthActions.logout, (state, action) => {
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.loginStart, (state, action) => {
        return {
            ...state,
            authError: '',
            loading:true
        }
    }),
    on(AuthActions.loginFail, (state, action) => {
        return {
            ...state,
            user:null,
            authError: action.payload,
            loading:false
        }
    }),
);