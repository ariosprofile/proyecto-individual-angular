import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const ADMINLAYOUT_ROUTES: Routes = [
    {
        path:'', component: AdminLayoutComponent, children: [
            { path:'', 
                loadChildren:() => import('../../admin/admin.routes').then(m => m.ADMIN_ROUTES)
            }
        ]
    }
];