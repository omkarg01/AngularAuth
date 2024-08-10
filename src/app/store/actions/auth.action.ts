import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[Auth] Load Users');

export const loadUsersSuccess = createAction(
  '[Auth] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Auth] Load Users Failure',
  props<{ error: string }>() // Include error message or details
);



export const setUserDetail = createAction('[Login] Set User Detail', props<{ userDetail: string, detailType: 'email' | 'phone' }>());
export const clearUserDetail = createAction('[Login] Clear User Detail');
