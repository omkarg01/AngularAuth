import { createAction, props } from '@ngrx/store';

export const setUserDetail = createAction(
  '[Login] Set User Detail',
  props<{ userDetail: string; detailType: string; name: string }>()
);

export const removeUserDetail = createAction('[Login] Remove User Detail');
