import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../../core/services/bookservice/book.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit, OnDestroy {

  @Input() book?: Book;
  subscriptions: SubscriptionLike[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService : BookService
  ){}

  ngOnInit(): void {
    this.getBook();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }

  getBook() : void {
    const id = Number(this.route.snapshot.paramMap.get('slug'));
    this.subscriptions.push(
    this.bookService.getBook(id).subscribe(book => this.book = book));
  }

}
