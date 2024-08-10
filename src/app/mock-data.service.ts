import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from './store/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This ensures the service is available app-wide
})
export class MockDataService {
  private users: User[] = [
    { email: 'test@example.com', name: 'Name', password: 'password123' },
    { phone: '1234567890', name: 'OG', password: 'password456' },
  ];

  constructor() {}

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User): Observable<User[]> {
    this.users.push(user);
    return of(this.users);
  }

  userExist(emailOrPhone: string): Observable<{ exists: boolean; user?: User }> {
    let foundUser: User | undefined;
    const exists = this.users.some((user) => {
      foundUser = user;
      return user.email === emailOrPhone || user.phone === emailOrPhone;
    });
    return of({ exists, user: foundUser });
  }

  validatePassword(
    emailOrPhone: string,
    password: string
  ): Observable<boolean> {
    const valid = this.users.some(
      (user) =>
        (user.email === emailOrPhone || user.phone === emailOrPhone) &&
        user.password === password
    );
    return of(valid);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
