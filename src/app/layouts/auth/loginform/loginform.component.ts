// loginform.component.ts

import { Component, OnInit } from '@angular/core';
import {NurseService} from "../../../services/nurse.service";
import {Router} from "@angular/router";
import {NotificationServiceService} from "../../../services/notification-service.service";

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {
    email: string;
    password: string;

    constructor(
        private nurseService: NurseService,
        private router: Router,
        private notificationService: NotificationServiceService
    ) {}

    ngOnInit(): void {}

    onSubmit() {
        if (!this.email || !this.password) {
            this.notificationService.showError(
                'Email and password are required!',
                'Error'
            );
            return;
        }

        const credentials = {
            email: this.email,
            password: this.password,
        };

        this.nurseService.loginNurse(credentials).subscribe(
            (response) => {
                console.log('Login successful:', response);
                this.nurseService.setSession(response);
                this.router.navigate(['/Mangment']); // Corrected typo in the route
                this.notificationService.showSuccess('Login successful!', 'Success');
            },
            (error) => {
                console.error('Login failed:', error);

                if (error.status === 401) {
                    this.notificationService.showError(
                        'Invalid email or password!',
                        'Error'
                    );
                } else {
                    this.notificationService.showError(
                        'Login failed. Please try again.',
                        'Error'
                    );
                }
            }
        );




    }
}