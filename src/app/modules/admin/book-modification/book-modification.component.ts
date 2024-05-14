import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../core/services/bookservice/book.service';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-modification',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-modification.component.html',
  styleUrl: './book-modification.component.css'
})
export class BookModificationComponent implements OnInit{
    
  @Input() book?: Book;

  updateBookForm = new FormGroup({
    author : new FormControl(''),
    genre: new FormControl(''),
    title: new FormControl(''),
    synopsis: new FormControl(''),
    pictureUrl: new FormControl('')
  });

    constructor(
      private route: ActivatedRoute,
      private bookService : BookService,
      private formBuilder : FormBuilder
    ){
      this.updateBookForm = this.formBuilder.group({
        author: ['', Validators.required],
        genre: ['', Validators.required],
        title: ['', Validators.required],
        synopsis: ['', Validators.required],
        pictureUrl: ['', Validators.required]
      })
    }

    ngOnInit(): void {
      this.getBook();
    }
  
    getBook() : void {
      const id = Number(this.route.snapshot.paramMap.get('slug'));
      this.bookService.getBook(id).subscribe(book => this.book = book)
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

        this.bookService.updateBook(idBook, updatedBook).subscribe(
          () => {
            this.getBook();
          },
          () => {
            console.log('Libro modificado correctamente');
          }
        );

      }
    }
}
