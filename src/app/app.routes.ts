import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:() => import('./modules/layouts/authenticationlayout/authentication.routes').then(m => m.USER_ROUTES)
    },
    {
        path:'user-view',
        loadChildren:() => import('./modules/layouts/userlayout/userlayout.routes').then(m => m.USER_ROUTES)
    }
];
