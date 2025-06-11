import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{ payload: { email: string, password: string } }>()
);

export const authenticateSuccess = createAction(
    '[Auth] Authenticate Success',
    props<{ payload: { email: string, userId: string, token: string, expirationDate: Date } }>()
);

export const authenticateFail = createAction(
    '[Auth] Authenticate Fail',
    props<{ payload: string }>()
);

export const signupStart = createAction(
    '[Auth] Signup Start',
    props<{ payload: { email: string, password: string } }>()
);

export const logout = createAction(
    '[Auth] Logout',    
);

export const clearError = createAction(
    '[Auth] Clear Error',    
);

export const autoLogin = createAction(
    '[Auth] Auto Login'
);