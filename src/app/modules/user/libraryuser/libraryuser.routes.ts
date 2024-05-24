import { Routes } from "@angular/router";
import { UserDetailComponent } from "./user-detail/user-detail.component";

export const LIBRARYUSER_ROUTES: Routes = [
    { path: 'user-detail/:slug', component: UserDetailComponent}
]
