import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path:'',
        loadChildren:() => import('./modules/layouts/authenticationlayout/authentication.routes').then(m => m.AUTHENTICATION_ROUTES)
    },
    {
        path:'user-view',
        loadChildren:() => import('./modules/layouts/userlayout/userlayout.routes').then(m => m.USER_ROUTES),
        canActivate: [AuthGuard]
    },
    {
        path:'admin-view',
        loadChildren:() => import('./modules/layouts/adminlayout/adminlayout.routes').then(m => m.ADMINLAYOUT_ROUTES),
        canActivate: [AuthGuard]
    }
];
