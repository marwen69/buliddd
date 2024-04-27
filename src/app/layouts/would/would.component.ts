import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurgicalOperationService} from "../../services/surgical-operation.service";
import {NotificationServiceService} from "../../services/notification-service.service";
import {WoundService} from "../../services/schematique.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-would',
  templateUrl: './would.component.html',
  styleUrls: ['./would.component.scss']
})
export class WouldComponent implements OnInit {
  patientId: string;
  would: any[]; // Update the type based on your actual would model
  // Pagination properties
  pagedSurgicalOperations: any[] = [];
  pageSize = 2; // Adjust as needed
  pageSizeOptions: number[] = [4, 8, 12]; // Adjust as needed
  currentPage = 0;
  constructor(
      private router: Router, // Inject the Router service

              private route: ActivatedRoute,
              private surgicalOperationService: SurgicalOperationService, // Inject your SurgicalOperationService
              private notificationService: NotificationServiceService, // Inject the notification service) { }
              private woundService: WoundService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('id');
      this.loadSurgicalOperations();
    });
  }

  loadSurgicalOperations(): void {
    // Use this.patientId to fetch surgical operations for the specific patient
    this.woundService.getAllWoundsForPatient(this.patientId).subscribe(
        (would) => {
          this.would = would;
          this.updatePagedSurgicalOperations();
        },
        (error) => {
          console.error(error);
        }
    );
  }


  updatePagedSurgicalOperations(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedSurgicalOperations = this.would.slice(startIndex, startIndex + this.pageSize);
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedSurgicalOperations();
  }
  goBack(): void {
    // Navigate back to the patient-details page
    this.router.navigate(['/patient-details', this.patientId]);
  }

  removeSurgicalOperation(_id: any) {
    this.woundService.deleteWound(_id).subscribe(
        () => {
          // Successfully deleted, reload the medical administrations
          this.loadSurgicalOperations();
          // Show success notification
          this.notificationService.showSuccess(' Schematique Des Plaies removed successfully', 'Success');
        },
        (error) => {
          console.error(error);
          // Show error notification
          this.notificationService.showError('Error removing  Schematique Des Plaies', 'Error');
        }
    );
  }
    
  }

