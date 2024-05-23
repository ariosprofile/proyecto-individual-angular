import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../core/services/bookservice/book.service';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-book-modification',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-modification.component.html',
  styleUrl: './book-modification.component.css'
})
export class BookModificationComponent implements OnInit, OnDestroy {
    
  @Input() book?: Book;
  subscriptions: SubscriptionLike[] = [];
  updateBookForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bookService : BookService,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {
    this.initializeForm();
    this.getBook();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }

  initializeForm() : void {
    this.updateBookForm = this.formBuilder.group({
      author: ['', Validators.required],
      genre: ['', Validators.required],
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      pictureUrl: ['', Validators.required]
    })
  }
  
  getBook() : void {
    const id = Number(this.route.snapshot.paramMap.get('slug'));
    this.subscriptions.push(
    this.bookService.getBook(id).subscribe(book => this.book = book));
  }

  modifyBook(idBook : number | undefined) : void{
    if (this.updateBookForm.valid) {
       const updatedBook : Book = {
        id: idBook,
        author: this.updateBookForm.value.author ?? '',
        genre: this.updateBookForm.value.genre ?? '',
        title: this.updateBookForm.value.title ?? '',
        synopsis: this.updateBookForm.value.synopsis ?? '',
        pictureUrl: this.updateBookForm.value.pictureUrl ?? '',
        stockTypesIds: []
      };
      this.subscriptions.push(
      this.bookService.updateBook(idBook, updatedBook).subscribe(
        () => {
          this.getBook();
          this.updateBookForm.reset();
        }
      ));
    }
  }
}
