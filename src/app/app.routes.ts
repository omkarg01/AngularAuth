import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserExistComponent } from './user-exist/user-exist.component';
import { CounterComponent } from './counter/counter.component';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    data: { some_data: 'some value' },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'counter',
    component: CounterComponent
  }
];
