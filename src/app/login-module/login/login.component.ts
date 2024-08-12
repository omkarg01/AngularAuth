import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { state } from '@angular/animations';
import { MockDataService } from '../../mock-data.service';
import { User } from '../../store/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  $detailType: Observable<string>;
  $userDetail: Observable<string>;
  $name: Observable<string | undefined>;
  userDetail!: string;
  detailType!: string;
  emailOrPhone = new FormControl('');
  password = new FormControl('', [Validators.required]);
  showEmail: boolean = true;
  users: User[] = [];
  passwordError = false;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ auth: AuthState }>,
    private mockDataService: MockDataService
  ) {
    this.titleService.setTitle('Login');
    this.$userDetail = this.store.select((state) => state.auth.userDetail);
    this.$detailType = this.store.select((state) => state.auth.detailType);
    this.$name = this.store.select((state) => state.auth.name);
    this.$detailType.subscribe((state) => (this.detailType = state));
    this.$userDetail.subscribe((state) => (this.userDetail = state));

    this.emailOrPhone.disable();
    this.emailOrPhone.patchValue(this.userDetail);
    console.log('detailType', this.detailType);
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/']);
  }

  next(e: Event) {
    e.preventDefault()
    // this.passwordError = false;
    if (this.emailOrPhone.value && this.password.value) {
      this.mockDataService
        .validatePassword(this.emailOrPhone.value, this.password.value)
        .subscribe((result) => {
          console.log('result', result);
          if (result) {
            this.router.navigate(['/login-success']);
          } else {
            this.passwordError = true;
            // alert('Passord is Incorrect!');
          }
        });
    }
  }
}
