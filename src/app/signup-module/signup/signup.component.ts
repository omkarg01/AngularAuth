import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { state } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../mock-data.service';
import { setUserDetail } from '../../store/actions/auth.action';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  emailOrPhone = new FormControl('');
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  detailType!: string;
  userDetail!: string;
  $detailType: Observable<string>;
  $userDetail: Observable<string>;

  constructor(
    private titleService: Title,
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private mockDataService: MockDataService
  ) {
    this.titleService.setTitle('Sing Up');
    this.$detailType = this.store.select((state) => state.auth.detailType);
    this.$userDetail = this.store.select((state) => state.auth.userDetail);
    this.$userDetail.subscribe((state) => (this.userDetail = state));
    this.$detailType.subscribe((state) => (this.detailType = state));
    this.emailOrPhone.patchValue(this.userDetail);
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/']);
  }

  next(e: Event) {
    e.preventDefault()
    // Check if both password and name fields are filled
    if (this.password.value && this.name.value) {

      // Create the user object with details
      this.mockDataService
        .addUser({
          [this.detailType]: this.userDetail,
          name: this.name.value,
          password: this.password.value,
        })
        .subscribe((result) => {
          console.log('user updated', result);

          // Dispatch action to update user details in the store
          this.store.dispatch(
            setUserDetail({
              userDetail: this.userDetail,
              detailType: this.detailType,
              name: this.name.value || '',
            })
          );
          // Navigate to the signup details page
          this.router.navigate(['/signup-details']);
        });
    }
  }
}
