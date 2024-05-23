import { Component, OnDestroy, OnInit } from '@angular/core';
import { LibraryUser } from '../../../core/models/library-user';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';
import { RouterLink } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-admin-library-user-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-library-user-list.component.html',
  styleUrl: './admin-library-user-list.component.css'
})
export class AdminLibraryUserListComponent implements OnInit, OnDestroy {

  libraryUsers : LibraryUser[] = [];
  subscriptions: SubscriptionLike[] = [];

  constructor(
    private libraryUserService : LibraryUserService
  ){}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }

  searchByRole(role : string) {
    const roleNumber = Number(role);
    if(role) {   
      this.subscriptions.push(
      this.libraryUserService.getLibraryUserByRole(roleNumber).subscribe(
        usersByRole => {
          this.libraryUsers = usersByRole
        }
      ));
    } else {
      this.getUsers();
    };
  }

  searchByUserName(userName : string) {
    if (userName) {
      this.subscriptions.push(
      this.libraryUserService.getLibraryUserByUserName(userName).subscribe(
        usersByUserName => {
          this.libraryUsers = usersByUserName;
        }
      ));
    } else {
      this.getUsers();
    }
  }

  searchById(id: string): void {
    const idNumber = Number(id);
    if (id) { 
      this.subscriptions.push(
      this.libraryUserService.getLibraryUser(idNumber).subscribe(
        userById => {
          this.libraryUsers = [userById];
        }
      ));
    } else {
      this.getUsers();
    }
  }
    
  getUsers() : void {
    this.subscriptions.push(
    this.libraryUserService.getLibraryUsers().subscribe(
      users => this.libraryUsers = users));
  }

  deleteLibraryUser(libraryUserId: number | undefined): void {
    this.subscriptions.push(
    this.libraryUserService.deleteLibraryUser(libraryUserId).subscribe(
      () => {
        this.getUsers(); 
      }
    ));
  }
}
