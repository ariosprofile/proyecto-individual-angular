import { Component, OnDestroy, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Book } from '../../../core/models/book';
import { BookService } from '../../../core/services/bookservice/book.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-admin-book-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-book-list.component.html',
  styleUrl: './admin-book-list.component.css'
})
export class AdminBookListComponent implements OnInit, OnDestroy {
  books : Book[] = [];
  uniqueGenres : string[] = [];
  subscriptions: SubscriptionLike[] = [];

  constructor(
    private bookService : BookService
  ){}

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }

  getUniqueGenres(books: Book[]): string[] {
    const uniqueGenres = new Set<string>();
    books.forEach(book => uniqueGenres.add(book.genre));
    return Array.from(uniqueGenres);
  }

  searchByGenre(genre : string) {
    if (genre) {
      this.subscriptions.push(
        this.bookService.getBooksByGenre(genre).subscribe(
        books => {
          this.books = books;
        }
      ));
    } else {
      this.getBooks();
    }
  }

  searchByTitle(title : string) {
    if (title) {
      this.subscriptions.push(
        this.bookService.getBooksByTitle(title).subscribe(
        books => {
          this.books = books;
        }
      ));
    } else {
      this.getBooks();
    }
  }

  searchByAuthor(author : string) {
    if (author) {
      this.subscriptions.push(
        this.bookService.getBooksByAuthor(author).subscribe(
        books => {
          this.books = books;
        }
      ));
    } else {
      this.getBooks();
    }
  }

  searchById(id: string): void {
    const idNumber = Number(id);
    if (id) {   
      this.subscriptions.push(
        this.bookService.getBook(idNumber).subscribe(
        userById => {
          this.books = [userById];
        }
      ));
    } else {
      this.getBooks();
    }
  }
    
  getBooks() : void {
    this.subscriptions.push(
      this.bookService.getBooks().subscribe(
      books => {
        this.books = books;
        this.uniqueGenres = this.getUniqueGenres(books);
      }));
  }

  deleteBook(bookId: number | undefined): void {
    this.subscriptions.push(
      this.bookService.deleteBook(bookId).subscribe(
      () => {
        this.getBooks();
      }
    ));
  }
}
