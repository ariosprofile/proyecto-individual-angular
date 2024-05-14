import { Component } from '@angular/core';
import { LibraryUser } from '../../../core/models/library-user';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css'
})
export class UserCreationComponent {

  newUserForm = new FormGroup({
    address: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    userName: new FormControl(''),
    creditCard: new FormControl(''),
    role: new FormControl()
  });

  constructor(
    private libraryUserService : LibraryUserService,
    private formBuilder : FormBuilder
  ){
    this.newUserForm = this.formBuilder.group({
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userName: ['', Validators.required],
      creditCard: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  createUser() {
    if (this.newUserForm.valid) {
      const newUser : LibraryUser = {
        address: this.newUserForm.value.address ?? '',
        email: this.newUserForm.value.email ?? '',
        password: this.newUserForm.value.password ?? '',
        userName: this.newUserForm.value.userName ?? '',
        creditCard: this.newUserForm.value.creditCard ?? '',
        role: this.newUserForm.value.role ?? '',
        leasedBooksIds: []
      };

    this.libraryUserService.createLibraryUser(newUser).subscribe(      
    () => {
      console.log("Usuario creado correctamente.")
    },
    (error) => {
      console.log('Error al crear el usuario', error);
    }
  );
    }
  }
}
