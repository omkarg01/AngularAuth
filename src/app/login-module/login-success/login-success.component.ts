import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/reducers/auth.reducer';
import { removeUserDetail } from '../../store/actions/auth.action';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [],
  templateUrl: './login-success.component.html',
  styleUrl: './login-success.component.scss',
})
export class LoginSuccessComponent {
  constructor(private store: Store<{ auth: AuthState }>) {
    console.log('removing...');
    this.store.dispatch(removeUserDetail());
  }
}
