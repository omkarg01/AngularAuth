import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from './store/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This ensures the service is available app-wide
})
export class MockDataService {
  // private users: User[] = [
  //   { email: 'test@example.com', name: 'John Doe', password: 'password123' },
  //   { phone: '1234567890', name: 'Omkar Gujja', password: 'password456' },
  // ];
  private storageKey = 'users'; // Key for localStorage
  private users: User[] = []; // Class property to hold users

  constructor() {
    this.loadInitialData();
  }

  /**
   * Initializes the service by loading users from localStorage.
   */
  private loadInitialData(): void {
    const usersJson = localStorage.getItem(this.storageKey);
    if (usersJson) {
      this.users = JSON.parse(usersJson);
    } else {
      // If no data in localStorage, initialize with default users
      this.users = [
        {
          email: 'test@example.com',
          name: 'John Doe',
          password: 'password123',
        },
        { phone: '1234567890', name: 'Omkar Gujja', password: 'password456' },
      ];
      this.saveUsersToStorage(); // Save initial data to localStorage
    }
  }

  /**
   * Returns an observable of the list of users.
   */
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  /**
   * Adds a new user to the list and returns an observable of the updated user list.
   *
   * @param user - The user to add.
   */
  addUser(user: User): Observable<User[]> {
    this.users.push(user);
    return of(this.users);
  }

  /**
   * Checks if a user with the given email or phone exists.
   *
   * @param emailOrPhone - The email or phone to check.
   * @returns An observable with an object containing `exists` and optionally the found user.
   */
  userExist(
    emailOrPhone: string
  ): Observable<{ exists: boolean; user?: User }> {
    let foundUser: User | undefined;
    const exists = this.users.some((user) => {
      foundUser = user;
      return user.email === emailOrPhone || user.phone === emailOrPhone;
    });
    return of({ exists, user: foundUser });
  }

  /**
   * Validates the password for the given email or phone.
   *
   * @param emailOrPhone - The email or phone to check.
   * @param password - The password to validate.
   * @returns An observable of a boolean indicating if the password is correct.
   */
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

  /**
   * Saves users to localStorage.
   */
  saveUsersToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }
}
