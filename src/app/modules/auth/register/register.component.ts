import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryUserService } from '../../../core/services/libraryuserservice/library-user.service';
import { Router, RouterLink } from '@angular/router';
import { CONSTANTS } from '../../../core/util/constants';
import { APP_ROUTES } from '../../../core/routes/aplication-routes';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy{
  registrationForm!: FormGroup;
  loginPage = APP_ROUTES.loginPage;
  subscriptions: SubscriptionLike[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private libraryUserService: LibraryUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }

  initializeForm() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      address: [''],
      role: 1
    });
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.subscriptions.push(
      this.libraryUserService.createLibraryUser(this.registrationForm.value).subscribe(
        () => {
          alert(CONSTANTS.successfullyRegistrationMessage);
          this.router.navigate([APP_ROUTES.loginPage]);
        }
      ));
    } else if (this.registrationForm.invalid) {
      this.markFormGroupTouched(this.registrationForm);
      return;
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
