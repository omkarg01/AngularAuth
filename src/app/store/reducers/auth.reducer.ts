import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { setUserDetail } from '../actions/auth.action';

export type AuthState = {
  name?: string;
  userDetail: string;
  detailType: string;
  userExists?: boolean;
  loginError?: string;
};

export const initialState: AuthState = {
  userDetail: '',
  detailType: '',
  name: '',
};

export const authReducer = createReducer(
  initialState,
  on(setUserDetail, (state, { userDetail, detailType, name }) => ({
    userDetail,
    detailType,
    name,
  }))
);
