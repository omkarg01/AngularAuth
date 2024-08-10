import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-detail.component.html',
  styleUrl: './signup-detail.component.scss',
})
export class SignupDetailComponent {
  signupDetailsForm = new FormGroup({
    orgName: new FormControl(''),
    orgId: new FormControl(''),
    designation: new FormControl(''),
    birthDate: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
  });

  constructor(private router: Router) {}

  onSubmit() {
    console.log(this.signupDetailsForm.value);
    console.log('Submitting...');
    this.router.navigate(['/signup-success']);
  }
}
