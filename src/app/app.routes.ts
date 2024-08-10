import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserExistComponent } from './user-exist/user-exist.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { SignupDetailComponent } from './signup-detail/signup-detail.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

export const routes: Routes = [
  {
    path: '',
    component: UserExistComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login-success',
    component: LoginSuccessComponent,
  },
  {
    path: 'signup-details',
    component: SignupDetailComponent,
  },
  {
    path: 'signup-success',
    component: SignupSuccessComponent,
  },
];
