import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryUserService } from '../services/libraryuserservice/library-user.service';
import { APP_ROUTES } from '../routes/aplication-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: LibraryUserService, private router: Router) {}

  canActivate(): boolean {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return true;
    } else {
      this.router.navigate([APP_ROUTES.loginPage]);
      return false;
    }
  }
}
