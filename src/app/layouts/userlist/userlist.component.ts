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
    searchTerm = ''; // Add searchTerm property here
    autoReloadInterval: any; // Variable to store the auto-reload interval

    constructor(private patientService: PatientService, private router: Router) {}

    ngOnInit(): void {
        this.getAllPatients();
        this.autoReloadInterval = setInterval(() => {
            this.getAllPatients();
        }, 30000); // Auto-reload every 30 seconds (adjust as needed)
    }

    ngOnDestroy(): void {
        clearInterval(this.autoReloadInterval); // Clear the auto-reload interval on component destruction
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

    deletePatient(matricule: number): void {
        if (confirm('Are you sure you want to delete this patient?')) {
            this.patientService.deletePatientByMatricule(matricule).subscribe(
                (response) => {
                    console.log('Patient deleted successfully:', response);
                    // Refresh the patient list or update pagedPatients
                    this.updatePatientList();
                },
                (error) => {
                    console.error('Error deleting patient:', error);
                    // Handle error, show an error message, etc.
                }
            );
        }
    }

    updatePatientList(): void {
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

    searchPatients(): void {
        if (this.searchTerm.trim() === '') {
            // If search term is empty, reset the patient list
            this.getAllPatients();
        } else {
            // Filter patients based on the search term
            this.pagedPatients = this.allPatients.filter((patient) =>
                patient.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                patient.matricule.toString().includes(this.searchTerm)
            );
        }
    }

    getAllPatients(): void {
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
}