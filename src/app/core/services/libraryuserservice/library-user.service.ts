import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { LibraryUser } from '../../models/library-user';
import { LIBRARYUSER_ROUTES } from '../../apiroutes/libraryuser-routes';

@Injectable({
  providedIn: 'root'
})
export class LibraryUserService {

  private user!: LibraryUser;

  userSubject: BehaviorSubject<LibraryUser | null> = new BehaviorSubject<LibraryUser| null >(null);

  private apiUrl = 'http://localhost:8080/libraryUser';
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
    return this.http.post<LibraryUser>(this.apiUrl, libraryUser, this.httpOptions);
  }

  deleteLibraryUser(id : number | undefined) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<LibraryUser>(url, this.httpOptions);
  }

  updateLibraryUser(id : number | undefined, libraryUser : LibraryUser) : Observable<LibraryUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<LibraryUser>(url, libraryUser, this.httpOptions);
  }

  loginUser(userName: string, password: string): Observable<LibraryUser>{

    const loginData = {userName, password};
    return this.http.post<LibraryUser>(LIBRARYUSER_ROUTES.login(), loginData).pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError('Correo electrónico o contraseña no válidos. Inténtalo de nuevo.')
        }else {
          return throwError('Se produjo un error al iniciar sesión. Vuelva a intentarlo más tarde.')
        }
      })
    );
  }

  setUser(user: LibraryUser) {
    this.user = user;
    this.userSubject.next(user);
  }
}
