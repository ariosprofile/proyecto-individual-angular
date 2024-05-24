import { Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';

export const AUTHENTICATION_ROUTES: Routes = [
    {
        path:'', component: AuthenticationLayoutComponent, children: [
            { path:'', 
                loadChildren:() => import('../../auth/auth.routes').then(m => m.AUTH_ROUTES)
            }
        ]
    }
];
