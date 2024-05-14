import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName : new FormControl(''),
    password : new FormControl('')
  });

  constructor(
    private libraryUserService : LibraryUserService,
    private formBuilder : FormBuilder
  ){
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  checkLogin(){
    
  }
  
}
