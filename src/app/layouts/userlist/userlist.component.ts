import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

    allPatients: any[] = [];
    pagedPatients: any[] = [];
    pageSize = 6;
    pageSizeOptions: number[] = [9, 18, 27];
    currentPage = 0;

    @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;

    constructor(private patientService: PatientService, private router: Router) { }

    ngOnInit(): void {
        this.patientService.getAllPatientsDetails().subscribe(
            (patients) => {
                this.allPatients = patients;
                this.updatePagedPatients();
            },
            (error) => {
                console.error(error);
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
        this.updatePaginatorLength();
    }

    viewPatientDetails(patientId: string): void {
        this.router.navigate(['/patient-details', patientId]);
    }

    searchPatients(event: any): void {
        const searchTerm: string = event.target.value.toLowerCase();
        this.pagedPatients = this.allPatients.filter(patient =>
            patient.firstName.toLowerCase().includes(searchTerm) ||
            patient.lastName.toLowerCase().includes(searchTerm) ||
            patient.matricule.toLowerCase().includes(searchTerm)
        );
        this.updatePaginatorLength();
    }

    updatePaginatorLength(): void {
        if (this.matPaginator) {
            this.matPaginator.length = this.pagedPatients.length;
            this.matPaginator.pageIndex = 0; // Reset to the first page after filtering
        }
    }


    searchPatientsByMatricule(event: any): void {
        const matricule: string = event.target.value.toLowerCase();
        this.patientService.getPatientByMatricule(matricule).subscribe(
            (patients) => {
                this.allPatients = [patients]; // Wrap the result in an array to keep the existing logic consistent
                this.currentPage = 0; // Reset to the first page after searching
                this.updatePagedPatients();
            },
            (error) => {
                console.error(error);
            }
        );
    }

}