import { Routes } from "@angular/router";

import { AdminBookListComponent } from "./admin-book-list/admin-book-list.component";
import { AdminLibraryUserListComponent } from "./admin-library-user-list/admin-library-user-list.component";
import { BookModificationComponent } from "./book-modification/book-modification.component";
import { BookCreationComponent } from "./book-creation/book-creation.component";
import { UserCreationComponent } from "./user-creation/user-creation.component";
import { UserModificationComponent } from "./user-modification/user-modification.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', component: AdminLibraryUserListComponent },
    { path: 'user-creation', component: UserCreationComponent},
    { path: 'user-modification/:slug', component: UserModificationComponent },
    { path: 'book-list', component: AdminBookListComponent },
    { path: 'book-creation', component: BookCreationComponent },
    { path: 'book-modification/:slug', component: BookModificationComponent },
]
