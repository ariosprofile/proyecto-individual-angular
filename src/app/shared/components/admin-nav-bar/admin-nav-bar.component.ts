import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../core/routes/aplication-routes';

@Component({
  selector: 'app-admin-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-nav-bar.component.html',
  styleUrl: './admin-nav-bar.component.css'
})
export class AdminNavBarComponent {

  adminStartPage = APP_ROUTES.adminUserList;
  adminBookCrud = APP_ROUTES.userBookList;
  loginPage = APP_ROUTES.loginPage;

}
