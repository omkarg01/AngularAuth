import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState as AuthState } from '../store/reducers/auth.reducer';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';
import { log } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../mock-data.service';
import { HttpClientModule } from '@angular/common/http';
import { setUserDetail } from '../store/actions/auth.action';
import { subscribe } from 'diagnostics_channel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-exist',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './user-exist.component.html',
  styleUrl: './user-exist.component.scss',
})
export class UserExistComponent {
  $detailType: Observable<string>;
  $userDetail: Observable<string>;
  userDetail!: string;
  detailType!: string;
  email = new FormControl('');
  phone = new FormControl('');
  emailOrPhoneError: boolean = false;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {
    /**
     * Subscribes to store selectors to retrieve and update user details and detail type.
     *
     * - Selects `userDetail` and `detailType` (`email` or `phone`) from the store.
     * - Subscribes to `detailType` and `userDetail` observables, updating the component properties `detailType` and `userDetail` respectively.
     * - Based on the `detailType`, patches the corresponding form control (`email` or `phone`) with the `userDetail` value.
     */
    this.$userDetail = this.store.select((state) => state.auth.userDetail);
    this.$detailType = this.store.select((state) => state.auth.detailType);
    this.$detailType.subscribe((state) => (this.detailType = state));
    this.$userDetail.subscribe((state) => (this.userDetail = state));

    if (this.detailType === 'email') {
      this.email.patchValue(this.userDetail);
    } else {
      this.phone.patchValue(this.userDetail);
    }
  }

  /**
   * Handles form submission to determine user existence and navigate accordingly.
   *
   * @param e - The event object from the form submission, used to prevent default behavior.
   */
  next(e: Event) {
    e.preventDefault();

    const emailValue = this.email.value?.trim();
    const phoneValue = this.phone.value?.trim();

    if (emailValue) {
      this.checkUserExistence(emailValue, 'email');
    } else if (phoneValue) {
      this.checkUserExistence(phoneValue, 'phone');
    } else {
      this.emailOrPhoneError = true;
    }
  }

  /**
   * Checks if a user exists based on the provided detail and type.
   *
   * @param userDetail - The user detail (email or phone number).
   * @param detailType - The type of detail ('email' or 'phone').
   */
  private checkUserExistence(
    userDetail: string,
    detailType: 'email' | 'phone'
  ) {
    this.mockDataService.userExist(userDetail).subscribe((result) => {
      console.log('result', result);

      // Dispatch user details to the store.
      this.store.dispatch(
        setUserDetail({
          userDetail: userDetail || '',
          detailType: detailType,
          name: result.user?.name || '',
        })
      );

      // Navigate based on user existence.
      const route = result.exists ? '/login' : '/signup';
      this.router.navigate([route]);
    });
  }
}
