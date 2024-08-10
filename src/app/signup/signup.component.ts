import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthState } from '../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { state } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../mock-data.service';
import { setUserDetail } from '../store/actions/auth.action';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  emailOrPhone = new FormControl('');
  name = new FormControl('');
  password = new FormControl('');
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

  next() {
    if (this.password.value && this.name.value) {
      this.mockDataService
        .addUser({
          [this.detailType]: this.userDetail,
          name: this.name.value,
          password: this.password.value,
        })
        .subscribe((result) => {
          console.log('user updated', result);
          this.store.dispatch(
            setUserDetail({
              userDetail: this.userDetail,
              detailType: this.detailType,
              name: this.name.value || '',
            })
          );
          this.router.navigate(['/signup-details']);
        });
    }
  }
}
