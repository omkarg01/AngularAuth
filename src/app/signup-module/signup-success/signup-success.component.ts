import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MockDataService } from '../../mock-data.service';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.scss',
})
export class SignupSuccessComponent {
  constructor(
    private router: Router,
    private mockDataService: MockDataService
  ) {
    this.mockDataService.saveUsersToStorage();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
