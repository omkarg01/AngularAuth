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

@Component({
  selector: 'app-user-exist',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
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

  // $users: Observable<User[]>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {
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

  ngOnInit() {}

  next() {
    console.log('form email', this.email.value);
    console.log('form phone', this.phone.value);
    if (this.email.value) {
      this.mockDataService.userExist(this.email.value).subscribe((result) => {
        console.log("result", result);
        this.store.dispatch(
          setUserDetail({
            userDetail: this.email.value || '',
            detailType: 'email',
            name: result.user?.name
          })
        );
        if (result.exists) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/signup']);
        }
      });
    } else if (this.phone.value) {
      this.mockDataService.userExist(this.phone.value).subscribe((result) => {
        this.store.dispatch(
          setUserDetail({
            userDetail: this.phone.value || '',
            detailType: 'phone',
            name: result.user?.name
          })
        );
        if (result.exists) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/signup']);
        }
      });
    }
  }
}
