import { createReducer, on } from '@ngrx/store';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from '../actions/counter.action';

export type InitalState = {
  value: number;
};

export const initalState: InitalState = {
  value: 0,
};

export const counterReducer = createReducer(
  initalState,
  on(increment, (state) => ({ value: state.value + 1 })),
  on(decrement, (state) => ({ value: state.value - 1 })),
  on(incrementByAmount, (state, { amount }) => ({
    value: state.value + amount,
  })),
  on(reset, (state) => ({ value: 0 }))
);
