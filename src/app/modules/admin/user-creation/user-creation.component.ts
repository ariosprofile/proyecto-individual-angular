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
    this.subscriptions.push(
    this.libraryUserService.createLibraryUser(this.newUserForm.value).subscribe(      
    () => {
      this.newUserForm.reset();
    }
    ));
  }
}
}
