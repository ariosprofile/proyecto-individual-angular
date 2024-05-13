import { Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';

export const USER_ROUTES: Routes = [
    {
        path:'', component: AuthenticationLayoutComponent, children: [
            { path:'', 
                loadChildren:() => import('../../auth/auth.routes').then(m => m.BOOKS_ROUTES)
            }
        ]
    }
];
