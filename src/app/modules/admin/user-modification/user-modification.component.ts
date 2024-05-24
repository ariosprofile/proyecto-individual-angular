import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LibraryUser } from '../../../core/models/library-user';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-user-modification',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-modification.component.html',
  styleUrl: './user-modification.component.css'
})
export class UserModificationComponent implements OnInit, OnDestroy{
  
  @Input() user?: LibraryUser;
  subscriptions: SubscriptionLike[] = [];

  updateUserForm!: FormGroup;

    constructor(
      private route: ActivatedRoute,
      private libraryUserService : LibraryUserService,
      private formBuilder : FormBuilder
    ){}

    ngOnInit(): void {
      this.initializeForm();
      this.getUser();
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach(
        (subscription) => subscription.unsubscribe());
    }

    initializeForm() : void {
      this.updateUserForm = this.formBuilder.group({
        address: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        userName: ['', Validators.required],
        creditCard: ['', Validators.required],
        role: ['', Validators.required]
      })
    }
  
    getUser() : void {
      const id = Number(this.route.snapshot.paramMap.get('slug'));
      this.subscriptions.push(
      this.libraryUserService.getLibraryUser(id).subscribe(user => this.user = user));
    }

    modifyUser(idUser : number | undefined) : void{
      if (this.updateUserForm.valid) {
        const updatedUser : LibraryUser = {
          id: idUser,
          address: this.updateUserForm.value.address ?? '',
          email: this.updateUserForm.value.email ?? '',
          password: this.updateUserForm.value.password ?? '',
          userName: this.updateUserForm.value.userName ?? '',
          creditCard: this.updateUserForm.value.creditCard ?? '',
          role: this.updateUserForm.value.role ?? '',
          leasedBooksIds: []
        };

        this.subscriptions.push(
        this.libraryUserService.updateLibraryUser(idUser, updatedUser).subscribe(
          () => {
            this.getUser();
            this.updateUserForm.reset();
          }
        ));
      }
    }
}
