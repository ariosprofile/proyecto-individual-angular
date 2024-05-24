import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { LibraryUser } from '../../models/library-user';
import { LIBRARYUSER_ROUTES } from '../../routes/libraryuser-routes';
import { CONSTANTS } from '../../util/constants';


@Injectable({
  providedIn: 'root'
})
export class LibraryUserService {

  private user!: LibraryUser;
  userSubject: BehaviorSubject<LibraryUser | null> = new BehaviorSubject<LibraryUser| null >(null);

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getLibraryUsers() : Observable<LibraryUser[]> {
    return this.http.get<LibraryUser[]>(LIBRARYUSER_ROUTES.list());
  }

  getLibraryUser(id : number) : Observable<LibraryUser> {
    return this.http.get<LibraryUser>(LIBRARYUSER_ROUTES.get(id));
  }

  getLibraryUserByUserName(userName : string) : Observable<LibraryUser[]> {
    return this.http.get<LibraryUser[]>(LIBRARYUSER_ROUTES.findByUserName(userName));
  }

  getLibraryUserByRole(role : number) : Observable<LibraryUser[]> {
    return this.http.get<LibraryUser[]>(LIBRARYUSER_ROUTES.findByRole(role));
  }

  createLibraryUser(libraryUser : LibraryUser) : Observable<LibraryUser> {
    return this.http.post<LibraryUser>(LIBRARYUSER_ROUTES.create(), libraryUser, this.httpOptions);
  }

  deleteLibraryUser(id : number | undefined) {
    return this.http.delete<LibraryUser>(LIBRARYUSER_ROUTES.delete(id), this.httpOptions);
  }

  updateLibraryUser(id : number | undefined, libraryUser : LibraryUser) : Observable<LibraryUser> {
    return this.http.put<LibraryUser>(LIBRARYUSER_ROUTES.update(id), libraryUser, this.httpOptions);
  }

  loginUser(userName: string, password: string): Observable<LibraryUser>{

    const loginData = {userName, password};
    return this.http.post<LibraryUser>(LIBRARYUSER_ROUTES.login(), loginData).pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError(CONSTANTS.errorMessageIdentification)
        }else {
          return throwError(CONSTANTS.errorLogin)
        }
      })
    );
  }

  setUser(user: LibraryUser) {
    this.user = user;
    this.userSubject.next(user);
  }
}
