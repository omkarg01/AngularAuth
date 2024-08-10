import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Decrement] Decrement');
export const incrementByAmount = createAction(
  '[Counter Component] Increment By Amount',
  props<{ amount: number }>()
);
export const reset = createAction('[Counter Reset] Reset');
