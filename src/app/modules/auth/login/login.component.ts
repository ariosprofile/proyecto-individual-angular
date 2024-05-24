import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { CONSTANTS } from '../../../core/util/constants';
import { APP_ROUTES } from '../../../core/routes/aplication-routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  subscriptions: SubscriptionLike[] = [];
  loginError: string | null = null;

  constructor(
    private libraryUserService : LibraryUserService,
    private formBuilder : FormBuilder,
    private router : Router
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }

  initializeForm() : void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  checkLogin(){

    if (this.loginForm.invalid){
      return;
    }

    const loginData = this.loginForm.value;
    this.subscriptions.push(
    this.libraryUserService.loginUser(loginData.userName, loginData.password).subscribe( user => {
      if (user) {
        this.libraryUserService.setUser(user);
        if (user.role == 0) {
          this.router.navigate([APP_ROUTES.adminUserList]);
        } else {
          this.router.navigate([APP_ROUTES.userBookList]);
        }
      } else {
        this.loginError = CONSTANTS.errorMessageIdentification;
      }
    }
    ));
  }
}
