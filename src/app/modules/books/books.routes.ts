import { Routes } from "@angular/router";
import { BookListComponent } from "./book-list/book-list.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";

export const BOOKS_ROUTES: Routes = [
    { path: '', component: BookListComponent },
    { path: ':slug', component: BookDetailComponent }
]
