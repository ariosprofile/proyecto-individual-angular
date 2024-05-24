import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../core/services/bookservice/book.service';
import { Book } from '../../../core/models/book';
import { SubscriptionLike } from 'rxjs';


@Component({
  selector: 'app-book-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-creation.component.html',
  styleUrl: './book-creation.component.css'
})
export class BookCreationComponent implements OnInit, OnDestroy {
  
  newBookForm!: FormGroup;
  subscriptions: SubscriptionLike[] = [];

  constructor(
    private bookService : BookService,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }

  initializeForm() : void {
    this.newBookForm = this.formBuilder.group({
      author: ['', Validators.required],
      genre: ['', Validators.required],
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      pictureUrl: ['', Validators.required]
    });
  }

  createBook() {
    if (this.newBookForm.valid) {
      const newBook : Book = {
        author: this.newBookForm.value.author ?? '',
        genre: this.newBookForm.value.genre ?? '',
        title: this.newBookForm.value.title ?? '',
        synopsis: this.newBookForm.value.synopsis ?? '',
        pictureUrl: this.newBookForm.value.pictureUrl ?? '',
        stockTypesIds: []
      };

    this.subscriptions.push(
    this.bookService.createBook(newBook).subscribe(      
    () => {
      this.newBookForm.reset()
    }
    ));
    }
  }
}

