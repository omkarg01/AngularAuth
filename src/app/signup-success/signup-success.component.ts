import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.scss',
})
export class SignupSuccessComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
