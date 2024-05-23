import { Component, OnDestroy, OnInit } from '@angular/core';
import { LibraryUser } from '../../../core/models/library-user';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css'
})
export class UserCreationComponent implements OnInit, OnDestroy{

  newUserForm!: FormGroup;
  subscriptions: SubscriptionLike[] = [];

  constructor(
    private libraryUserService : LibraryUserService,
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
        id: 0,
        address: this.newUserForm.value.address ?? '',
        email: this.newUserForm.value.email ?? '',
        password: this.newUserForm.value.password ?? '',
        userName: this.newUserForm.value.userName ?? '',
        creditCard: this.newUserForm.value.creditCard ?? '',
        role: this.newUserForm.value.role ?? '',
        leasedBooksIds: []
      };

    this.subscriptions.push(
    this.libraryUserService.createLibraryUser(newUser).subscribe(      
    () => {
      this.newUserForm.reset();
      console.log("Usuario creado correctamente.")
    }
    ));
  }
}
}
