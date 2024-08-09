import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InitalState } from '../store/reducers/counter.reducer';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from '../store/actions/action.reducer';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  $count: Observable<number>;

  constructor(private store: Store<{ counter: InitalState }>) {
    this.$count = store.select((state) => state.counter.value);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  incrementByAmount(amount: number) {
    this.store.dispatch(incrementByAmount({ amount }));
  }

  reset() {
    this.store.dispatch(reset());
  }
}
