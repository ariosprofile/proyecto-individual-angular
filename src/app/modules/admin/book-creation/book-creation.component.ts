import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../core/services/bookservice/book.service';
import { Book } from '../../../core/models/book';


@Component({
  selector: 'app-book-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-creation.component.html',
  styleUrl: './book-creation.component.css'
})
export class BookCreationComponent {
  
  newBookForm = new FormGroup({
    author : new FormControl(''),
    genre: new FormControl(''),
    title: new FormControl(''),
    synopsis: new FormControl(''),
    pictureUrl: new FormControl('')
  });

  constructor(
    private bookService : BookService,
    private formBuilder : FormBuilder
  ){
    this.newBookForm = this.formBuilder.group({
      author: ['', Validators.required],
      genre: ['', Validators.required],
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      pictureUrl: ['', Validators.required]
    })
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

    this.bookService.createBook(newBook).subscribe(      
    () => {
      console.log("Libro creado correctamente.")
    },
    (error) => {
      console.log('Error al crear el libro', error);
    }
  );
    }
  }
}

