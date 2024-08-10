import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-try-tailwind',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './try-tailwind.component.html',
  styleUrl: './try-tailwind.component.scss',
})
export class TryTailwindComponent {
  orgName = new FormControl('');
  orgId: any;
  designation: any;
  birthDate: any;
  city: any;
  pincode: any;

  constructor(private router: Router){

  }

  onSubmit() {

    console.log('Hello');
    console.log(this.orgName.value);
  }
}
