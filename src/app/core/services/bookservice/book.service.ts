import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BOOK_ROUTES } from '../../apiroutes/book-routes';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(BOOK_ROUTES.list());
  }

  getBook(id : number) : Observable<Book> {
    return this.http.get<Book>(BOOK_ROUTES.get(id));
  }

  getBooksByGenre(genre : string) : Observable<Book[]> {
    return this.http.get<Book[]>(BOOK_ROUTES.findByGenre(genre));
  }

  getBooksByTitle(title : string) : Observable<Book[]> {
    return this.http.get<Book[]>(BOOK_ROUTES.findByTitle(title));
  }

  getBooksByAuthor(author : string) : Observable<Book[]> {
    return this.http.get<Book[]>(BOOK_ROUTES.findByAuthor(author));
  }

  createBook(book : Book) : Observable<Book> {
    return this.http.post<Book>(BOOK_ROUTES.create(), book, this.httpOptions);
  }

  deleteBook(id : number | undefined) {
    return this.http.delete<Book>(BOOK_ROUTES.delete(id), this.httpOptions);
  }

  updateBook(id : number | undefined, book : Book) : Observable<Book> {
    return this.http.put<Book>(BOOK_ROUTES.update(id), book, this.httpOptions);
  }

}
