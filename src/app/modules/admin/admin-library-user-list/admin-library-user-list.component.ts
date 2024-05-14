import { Component } from '@angular/core';
import { LibraryUser } from '../../../core/models/library-user';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-library-user-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-library-user-list.component.html',
  styleUrl: './admin-library-user-list.component.css'
})
export class AdminLibraryUserListComponent {
  libraryUsers : LibraryUser[] = [];

  constructor(
    private libraryUserService : LibraryUserService
  ){}

  ngOnInit(): void {
    this.getUsers();
  }
    
  getUsers() : void {
    this.libraryUserService.getLibraryUsers().subscribe(users => this.libraryUsers = users, 
      (error) => {
        console.error('Error al obtener los usuarios', error);
      });
  }

  deleteLibraryUser(libraryUserId: number | undefined): void {
    this.libraryUserService.deleteLibraryUser(libraryUserId).subscribe(
      () => {
        this.getUsers(); 
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
}
