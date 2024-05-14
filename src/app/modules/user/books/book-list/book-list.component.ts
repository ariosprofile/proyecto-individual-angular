import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book';
import { BookService } from '../../../../core/services/bookservice/book.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books : Book[] = [];

  constructor(
    private bookService : BookService
  ){}

  ngOnInit(): void {
    this.getBooks();
  }
    
  getBooks() : void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

}
