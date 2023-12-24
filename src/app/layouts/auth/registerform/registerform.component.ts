import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NurseService } from "../../../services/nurse.service";
import {NotificationServiceService} from "../../../services/notification-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss'],
})
export class RegisterformComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
      private nurseService: NurseService,
      private router: Router,
      private notificationService: NotificationServiceService,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.notificationService.showError('Please fill in all required fields correctly.', 'Error');
      return;
    }

    if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
      this.notificationService.showError('Passwords do not match!', 'Error');
      return;
    }

    const nurseData = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      // ... add other properties as needed
    };

    this.nurseService.createNurse(nurseData).subscribe(
        (response) => {
          this.router.navigate(['/login']);
          this.notificationService.showSuccess('Registration successful! Check your email.', 'Success');
        },
        (error) => {
          console.error('Registration failed:', error);
          if (error.status === 409) {
            this.notificationService.showError('Email already exists!', 'Error');
          } else {
            this.notificationService.showError('Registration failed!', 'Error');
          }
        }
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.registrationForm.get(fieldName);
    return control.invalid && (control.dirty || control.touched);
  }
}