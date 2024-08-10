import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MockDataService } from '../../mock-data.service';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
} from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.mockDataService.getUsers().pipe(
          map((users) => {
            return loadUsersSuccess({ users });
          }),
          catchError((error) => of(loadUsersFailure({ error: error.message }))) // Handle error
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private mockDataService: MockDataService
  ) {}
}
