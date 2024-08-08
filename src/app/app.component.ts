import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  val = 'app';

  email = new FormControl('');
  phone = new FormControl('');

  constructor() {
    // setInterval(() => {
    //   this.val = Math.random().toString();
    // }, 500);
  }

  next() {
    console.log('email', this.email.value);
    console.log('phone', this.phone.value);
  }
}
