import { createAction, props } from '@ngrx/store';

export const setUserDetail = createAction(
  '[Login] Set User Detail',
  props<{ userDetail: string; detailType: string; name: string }>()
);