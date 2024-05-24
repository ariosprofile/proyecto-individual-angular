import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book';
import { BookService } from '../../../../core/services/bookservice/book.service';
import { RouterLink } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {

  books : Book[] = [];
  uniqueGenres : string [] = [];
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
    
  getBooks() : void {
    this.subscriptions.push(
    this.bookService.getBooks().subscribe(
      books => {
        this.books = books;
        this.uniqueGenres = this.getUniqueGenres(books);
      }));
  }
}
