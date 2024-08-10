import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from './store/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This ensures the service is available app-wide
})
export class MockDataService {
  private usersUrl = 'assets/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  userExist(emailOrPhone: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) =>
        users.some(
          (user) => user.email === emailOrPhone || user.phone === emailOrPhone
        )
      )
    );
  }

  validatePassword(
    emailOrPhone: string,
    password: string
  ): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) =>
        users.some(
          (user) =>
            (user.email === emailOrPhone || user.phone === emailOrPhone) &&
            user.password === password
        )
      )
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
