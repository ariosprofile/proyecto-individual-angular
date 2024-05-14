import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/book';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id : number) : Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  createBook(book : Book) : Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, this.httpOptions);
  }

  deleteBook(id : number | undefined) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Book>(url, this.httpOptions);
  }

  updateBook(id : number | undefined, book : Book) : Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Book>(url, book, this.httpOptions);
  }

}
