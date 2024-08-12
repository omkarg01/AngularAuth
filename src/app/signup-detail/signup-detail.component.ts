import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    orgName: new FormControl(''),
    orgId: new FormControl(''),
    designation: new FormControl(''),
    birthDate: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
  });

  constructor(private router: Router) {}

  onSubmit(e:Event) {
    e.preventDefault()
    console.log(this.signupDetailsForm.value);
    console.log('Submitting...');
    this.router.navigate(['/signup-success']);
  }
}
