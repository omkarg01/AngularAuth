import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup-detail.component.html',
  styleUrl: './signup-detail.component.scss',
})
export class SignupDetailComponent {
  signupDetailsForm = new FormGroup({
    orgName: new FormControl('', [Validators.required]),
    orgId: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private router: Router) {}

  /**
   * Handles form submission. Prevents default action, logs form values, 
   * and navigates to the success page if the form is valid.
   *
   * @param e - The event object from the form submission.
   */
  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.signupDetailsForm.value);
    if (this.signupDetailsForm.valid) {
      console.log('Submitting...');
      this.router.navigate(['/signup-success']);
    }
  }
}
