import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibraryUser } from '../../../core/models/library-user';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';
import { APP_ROUTES } from '../../../core/routes/aplication-routes';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy{

    currentUser: LibraryUser | null = null;
    subscriptions: SubscriptionLike[] = [];
    userStartPage = APP_ROUTES.userBookList;
    userProfile = APP_ROUTES.userDetail;
    loginPage = APP_ROUTES.loginPage;

    constructor(
      private libraryUserService : LibraryUserService
    ){}

  ngOnInit(): void {
    this.subscriptions.push(
    this.libraryUserService.userSubject.subscribe(
      user => this.currentUser = user
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }
}
