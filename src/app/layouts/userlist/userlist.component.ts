import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

    allPatients: any[] = [];
    pagedPatients: any[] = [];
    pageSize = 9; // 3x3 grid, so 3 rows and 3 columns
    pageSizeOptions: number[] = [9, 18, 27]; // Adjust as needed
    currentPage = 0;

    constructor(private patientService: PatientService, private router: Router) {}

    ngOnInit(): void {
        this.patientService.getAllPatientsDetails().subscribe(
            (patients) => {
                this.allPatients = patients;
                this.updatePagedPatients();
            },
            (error) => {
                console.error(error);
                // Handle error, show an error message, etc.
            }
        );
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePagedPatients();
    }

    updatePagedPatients(): void {
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedPatients = this.allPatients.slice(startIndex, endIndex);
    }

    viewPatientDetails(patientId: string): void {
        // Navigate to the detailed profile page with the patientId as a parameter
        this.router.navigate(['/patient-details', patientId]);
    }
}