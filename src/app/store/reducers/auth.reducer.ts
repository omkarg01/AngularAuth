import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { loadUsersSuccess, setUserDetail } from '../actions/auth.action';

export type AuthState = {
  userDetail: string;
  detailType: string;
  userExists?: boolean;
  loginError?: string;
};

export const initialState: AuthState = {
  userDetail: '',
  detailType: '',
};

export const authReducer = createReducer(
  initialState,
  on(setUserDetail, (state, { userDetail, detailType }) => ({
    userDetail,
    detailType,
  }))
);
