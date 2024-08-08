import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserExistComponent } from './user-exist/user-exist.component';

export const routes: Routes = [
  {
    path: '',
    component: UserExistComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { some_data: 'some value' },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
