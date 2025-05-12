import { Routes } from '@angular/router';

import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

export const routes: Routes = [
    { path: '', component: RecipeStartComponent },
    { path: ':id', component: RecipeDetailComponent },
];
