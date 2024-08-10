import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserExistComponent } from './user-exist/user-exist.component';
import { CounterComponent } from './counter/counter.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { SignupDetailComponent } from './signup-detail/signup-detail.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { TryTailwindComponent } from './try-tailwind/try-tailwind.component';

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
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'signup-details',
    component: SignupDetailComponent,
  },
  {
    path: 'signup-success',
    component: SignupSuccessComponent,
  },
  {
    path: 'tailwind',
    component: TryTailwindComponent,
  },
];
