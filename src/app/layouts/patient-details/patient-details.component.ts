import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PatientService} from "../../services/patient.service";

import {ActivatedRoute, Router} from "@angular/router";
import {MedicalAdministrationServiceService} from "../../services/medical-administration-service.service";
import {NotificationServiceService} from "../../services/notification-service.service";
import {NurseService} from "../../services/nurse.service";

// medical-administration-record.model.ts
export interface MedicalAdministrationRecord {
  dateDuSemain: Date;
  doctor: string;
  prescription: string;
  nomMedicament: string;
  poids: number;
  time: string;
  matin: boolean;
  apresMidi: boolean;
  soir: boolean;
  remarqueInfermier: string;
}




@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  patientId: string;
  patientDetails: any;
  @ViewChild('fsModalMedicalAdministrations') fsModalMedicalAdministrations: ElementRef;
  medicalAdministration: MedicalAdministrationRecord = {
    dateDuSemain: new Date(),
    doctor: '',
    prescription: '',
    nomMedicament: '',
    poids: 0,
    time: '',
    matin: false,
    apresMidi: false,
    soir: false,
    remarqueInfermier: '',
  };

  currentNurse: any;

  formSubmitted: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private patientService: PatientService,
      private medicalAdminService: MedicalAdministrationServiceService,
      private router: Router,
      private nurseService: NurseService,
      private notificationService: NotificationServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('id');
      this.loadPatientDetails();
    });

    // Retrieve the logged-in nurse information when the component initializes
    this.currentNurse = this.nurseService.getCurrentNurse();
    if (this.currentNurse) {
      // Set the nurse's name to the 'remarqueInfermier' field
      this.medicalAdministration.remarqueInfermier = `${this.currentNurse.firstName} ${this.currentNurse.lastName}`;
    }
  }

  loadPatientDetails(): void {
    this.patientService.getPatientById(this.patientId).subscribe(
        (patient) => {
          this.patientDetails = patient;
        },
        (error) => {
          console.error(error);
        }
    );
  }

  redirectToMedicalAdministrations(): void {
    this.router.navigate(['/medical-administrations', this.patientId]);
  }

  redirectToSurgicalOperations(): void {
    this.router.navigate(['/surgical-operations', this.patientId]);
  }

  openModalMedicalAdministrations() {
    this.fsModalMedicalAdministrations.nativeElement.style.display = 'block';
  }

  closeModalMedicalAdministrations() {
    this.fsModalMedicalAdministrations.nativeElement.style.display = 'none';
  }

  saveMedicalAdministration(): void {
    this.formSubmitted = true;

    // Validate required fields
    if (
        this.medicalAdministration.dateDuSemain &&
        this.medicalAdministration.doctor &&
        this.medicalAdministration.prescription &&
        this.medicalAdministration.nomMedicament &&
        this.medicalAdministration.poids &&
        this.medicalAdministration.time
    ) {
      this.medicalAdminService
          .createMedicalAdministration({
            ...this.medicalAdministration,
            patientId: this.patientId,
          })
          .subscribe(
              (response) => {
                console.log('Medical Administration saved successfully:', response);
                this.loadPatientDetails();
                this.closeModalMedicalAdministrations();
              },
              (error) => {
                console.error('Error saving Medical Administration:', error);
                this.notificationService.showError('Error saving Medical Administration', 'Error');
              }
          );
    } else {
      // Display a toast notification for validation error
      this.notificationService.showWarning('Please fill in all required fields', 'Validation Error');
    }
  }

  isFormValid(): boolean {
    return Boolean((
        this.medicalAdministration.dateDuSemain &&
        this.medicalAdministration.doctor &&
        this.medicalAdministration.prescription &&
        this.medicalAdministration.nomMedicament &&
        this.medicalAdministration.poids &&
        this.medicalAdministration.time &&
        this.medicalAdministration.remarqueInfermier
    ));
  }
}