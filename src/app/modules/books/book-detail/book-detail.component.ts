import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../core/services/bookservice/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{
  @Input() book?: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService : BookService
  ){}

  ngOnInit(): void {
    this.getBook();
  }

  getBook() : void {
    const id = Number(this.route.snapshot.paramMap.get('slug'));
    this.bookService.getBook(id).subscribe(book => this.book = book)
  }

}
