import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MedicalAdministrationServiceService} from "../../services/medical-administration-service.service";
import {NotificationServiceService} from "../../services/notification-service.service";

@Component({
  selector: 'app-medical-administrations',
  templateUrl: './medical-administrations.component.html',
  styleUrls: ['./medical-administrations.component.scss']
})
export class MedicalAdministrationsComponent implements OnInit {
  patientId: string;
  medicalAdministrations: any[]; // Update the type based on your actual medical administration model

  constructor(
      private route: ActivatedRoute,
      private medicalAdminService: MedicalAdministrationServiceService,
      private notificationService: NotificationServiceService // Inject the notification service
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('id');
      this.loadMedicalAdministrations();
    });
  }

  loadMedicalAdministrations(): void {
    this.medicalAdminService
        .getAllMedicalAdministrationsForPatient(this.patientId)
        .subscribe(
            (medicalAdmins) => {
              this.medicalAdministrations = medicalAdmins;
            },
            (error) => {
              console.error(error);
            }
        );
  }

  removeMedicalAdministration(adminId: string): void {
    this.medicalAdminService.deleteMedicalAdministration(adminId).subscribe(
        () => {
          // Successfully deleted, reload the medical administrations
          this.loadMedicalAdministrations();
          // Show success notification
          this.notificationService.showSuccess('Medical administration removed successfully', 'Success');
        },
        (error) => {
          console.error(error);
          // Show error notification
          this.notificationService.showError('Error removing medical administration', 'Error');
        }
    );
  }
}