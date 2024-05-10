import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'books',
        loadChildren:() => import('./modules/books/books.routes').then(m => m.BOOKS_ROUTES)
    }
];
