import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SurgicalOperationService} from "../../services/surgical-operation.service";
import {NotificationServiceService} from "../../services/notification-service.service";

@Component({
  selector: 'app-surgical-operation',
  templateUrl: './surgical-operation.component.html',
  styleUrls: ['./surgical-operation.component.scss']
})
export class SurgicalOperationComponent implements OnInit {

  patientId: string;
  surgicalOperations: any[]; // Update the type based on your actual surgical operation model

  constructor(
      private route: ActivatedRoute,
      private surgicalOperationService: SurgicalOperationService, // Inject your SurgicalOperationService
      private notificationService: NotificationServiceService // Inject the notification service

) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('id');
      this.loadSurgicalOperations();
    });
  }

  loadSurgicalOperations(): void {
    // Use this.patientId to fetch surgical operations for the specific patient
    this.surgicalOperationService.getAllSurgicalOperationRecords(this.patientId).subscribe(
        (surgicalOperations) => {
          this.surgicalOperations = surgicalOperations;
        },
        (error) => {
          console.error(error);
        }
    );
  }
  removeSurgicalOperation(operationId: string): void {
    // Check if operationId is provided
    if (!operationId) {
      console.error('Invalid SurgicalOperation ID');
      // Show error notification
      this.notificationService.showError('Invalid SurgicalOperation ID', 'Error');
      return;
    }

    // Ask for confirmation before proceeding
    const isConfirmed = confirm('Are you sure you want to remove this surgical operation?');

    if (!isConfirmed) {
      // If not confirmed, do nothing
      return;
    }

    this.surgicalOperationService.deleteSurgicalOperation(operationId).subscribe(
        () => {
          // Successfully deleted, reload the surgical operations
          this.loadSurgicalOperations();
          // Show success notification
          this.notificationService.showSuccess('Surgical operation removed successfully', 'Success');
        },
        (error) => {
          console.error(error);
          // Show error notification
          this.notificationService.showError('Error removing surgical operation', 'Error');
        }
    );
  }

}