import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Book } from '../../../core/models/book';
import { BookService } from '../../../core/services/bookservice/book.service';

@Component({
  selector: 'app-admin-book-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-book-list.component.html',
  styleUrl: './admin-book-list.component.css'
})
export class AdminBookListComponent {
  books : Book[] = [];

  constructor(
    private bookService : BookService
  ){}

  ngOnInit(): void {
    this.getBooks();
  }
    
  getBooks() : void {
    this.bookService.getBooks().subscribe(books => this.books = books, 
      (error) => {
        console.error('Error al obtener los libros', error);
      });
  }

  deleteBook(bookId: number | undefined): void {
    this.bookService.deleteBook(bookId).subscribe(
      () => {
        this.getBooks();
        console.log('Libro eliminado correctamente'); 
      }
    );
  }
}
