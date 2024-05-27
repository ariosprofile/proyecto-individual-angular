import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../core/routes/aplication-routes';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';
import { LibraryUser } from '../../../core/models/library-user';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-admin-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-nav-bar.component.html',
  styleUrl: './admin-nav-bar.component.css'
})
export class AdminNavBarComponent implements OnInit, OnDestroy{

  currentUser: LibraryUser | null = null;
  subscriptions: SubscriptionLike[] = [];
  adminStartPage = APP_ROUTES.adminUserList;
  adminBookCrud = APP_ROUTES.adminBookList;
  loginPage = APP_ROUTES.loginPage;

  constructor(
    private libraryUserService : LibraryUserService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.findUserByLocalStorage();
  }

  findUserByLocalStorage() {
    this.subscriptions.push(
      this.libraryUserService.getLibraryUser(Number(localStorage.getItem('userId'))).subscribe(
        user => this.currentUser = user
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }
}
