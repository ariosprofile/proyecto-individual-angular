import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';

export const USER_ROUTES: Routes = [
    {
        path:'', component: UserLayoutComponent, children: [
            { path:'', 
                loadChildren:() => import('../../user/books/books.routes').then(m => m.BOOKS_ROUTES)
            }, 
            {
                path:'user-info', 
                loadChildren:() => import('../../user/libraryuser/libraryuser.routes').then(m => m.LIBRARYUSER_ROUTES)  
            }
        ]
    }
];
