import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryUser } from '../../models/library-user';

@Injectable({
  providedIn: 'root'
})
export class LibraryUserService {

  private apiUrl = 'http://localhost:8080/libraryUser';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getLibraryUsers() : Observable<LibraryUser[]> {
    return this.http.get<LibraryUser[]>(this.apiUrl);
  }

  getLibraryUser(id : number) : Observable<LibraryUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<LibraryUser>(url);
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
}
