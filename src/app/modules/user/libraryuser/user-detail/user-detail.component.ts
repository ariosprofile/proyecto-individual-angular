import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LibraryUser } from '../../../../core/models/library-user';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryUserService } from '../../../../core/services/libraryuserservice/library-user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTES } from '../../../../core/routes/aplication-routes';
import { CONSTANTS } from '../../../../core/util/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserDetailComponent implements OnInit, OnDestroy {
  
  @Input() user?: LibraryUser;
  subscriptions: SubscriptionLike[] = [];
  updateUserForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private libraryUserService: LibraryUserService,
    private router: Router,
    private formBuilder : FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserAndInitializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getUserAndInitializeForm() {
    const id = Number(this.route.snapshot.paramMap.get('slug'));
    this.subscriptions.push(
      this.libraryUserService.getLibraryUser(id).subscribe(
        (user) => {
          this.user = user
          this.updateUserForm = this.formBuilder.group({
          userName: [`${user.userName}`, [Validators.required, Validators.minLength(4)]],
          email: [`${user.email}`],
          password: [`${user.password}`, [Validators.required, Validators.minLength(4)]],
          creditCard: [`${user.creditCard}`, [Validators.minLength(16)]],
          address: [`${user.address}`, Validators.required]
          })
        }));
  }

  onSubmit() {
    if (this.updateUserForm.valid && this.user && this.user.id) {
      this.subscriptions.push(
        this.libraryUserService.updateLibraryUser(this.user.id, this.user).subscribe(() => {
          alert(CONSTANTS.successfullyUpdateMessage);
          this.router.navigate([APP_ROUTES.userBookList]);
        })
      );
    } else if (this.updateUserForm.invalid) {
      this.markFormGroupTouched(this.updateUserForm);
      return;
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(
      control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
