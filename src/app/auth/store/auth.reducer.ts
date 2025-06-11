import { createReducer } from "@ngrx/store";
import { User } from "../user.model";

export type State = {
    user : User | null
};

const initialState: State = {
    user: null
};

export const authReducer = createReducer(
    initialState
);