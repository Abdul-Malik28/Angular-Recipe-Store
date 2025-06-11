import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{ payload: { email: string, password: string } }>()
);

export const login = createAction(
    '[Auth] Login',
    props<{ payload: { email: string, userId: string, token: string, expirationDate: Date } }>()
);

export const loginFail = createAction(
    '[Auth] Login Fail',
    props<{ payload: string }>()
);

export const logout = createAction(
    '[Auth] Logout',    
);

