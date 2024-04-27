import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientService } from "../../services/patient.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MedicalAdministrationServiceService } from "../../services/medical-administration-service.service";
import { NotificationServiceService } from "../../services/notification-service.service";
import { NurseService } from "../../services/nurse.service";
import { SurgicalOperationService } from "../../services/surgical-operation.service";
import {WoundService} from "../../services/schematique.service";

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

// Corrected OperationChirurgicale interface
export interface OperationChirurgicale {
  preOperative: {
    datepreOperative: Date;
    lieupreOperative: string;
    initialspreOperative: string;
  };
  drains: {
    typedrains: string;
    aspirationdrains: string;
    enleveenPlacedrains: string;
    enPlacedrains: {
      initenPlacedrains: Date;
      installeenPlacedrains: Date;
      enleveenPlacedrains: Date;
    };
  };
  postOperative: {
    soinpostOperative: string;
    datepostOperative: Date;
    lieupostOperative: string;
    initialspostOperative: string;
  };
  observations: string;
}

// Corrected chematiqueDesPlaies interface
export interface Wound {
  ficheSuivi: {
    plaiesPostOperation: boolean;
    plaies: boolean;
    plaiesPression: boolean;
    ulceresJambesPieds: boolean;
  };
  evaluationInitiale: {
    date: Date;
    site: string;
    profondeur: string;
    grandeur: string;
    phaseNecrose: boolean;
    inflammation: boolean;
    gangrene: boolean;
  };
  apparancePlaie: {
    seche: boolean;
    humide: boolean;
    necroseAvecFistule: boolean;
    oedeme: boolean;
  };
  peauPourtour: {
    intacte: boolean;
    maceration: boolean;
    rose: boolean;
    rougeur: boolean;
    oedemePhlyctene: boolean;
    induration: boolean;
    allergies: boolean;
  };
  ecoulement: {
    quantite: string;
    serux: boolean;
    sanguinolent: boolean;
    seroSanguinolent: boolean;
    purulent: boolean;
  };
  materielEnPlace: {
    drain: boolean;
    meche: boolean;
    longueurCm: number;
    pointsAgrafes: boolean;
  };
  nettoyage: {
    serumPhysiologique: boolean;
  };
  pansement: {
    sparadrap: boolean;
    tulleGras: boolean;
    protecteurCutane: boolean;
    compresse: boolean;
    bandage: boolean;
  };
}




@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  patientId: string;
  patientDetails: any;

  @ViewChild('fsModalOperationChirurgicale') fsModalOperationChirurgicale: ElementRef;
  @ViewChild('fsModalMedicalAdministrations') fsModalMedicalAdministrations: ElementRef;

  @ViewChild('fsModalSchematiqueDesPlaies') fsModalSchematiqueDesPlaies: ElementRef;

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

  operationChirurgicale: OperationChirurgicale = {
    preOperative: {
      datepreOperative: new Date(),
      lieupreOperative: '',
      initialspreOperative: '',
    },
    drains: {
      typedrains: '',
      aspirationdrains: '',
      enleveenPlacedrains: '',
      enPlacedrains: {
        initenPlacedrains: new Date(),
        installeenPlacedrains: new Date(),
        enleveenPlacedrains: new Date(),
      },
    },
    postOperative: {
      soinpostOperative: '',
      datepostOperative: new Date(),
      lieupostOperative: '',
      initialspostOperative: '',
    },
    observations: '',
  };



  wound: Wound = {
    ficheSuivi: {
      plaiesPostOperation: false,
      plaies: true,
      plaiesPression: false,
      ulceresJambesPieds: false,
    },
    evaluationInitiale: {
      date: new Date(),
      site: '',
      profondeur: '',
      grandeur: '',
      phaseNecrose: false,
      inflammation: false,
      gangrene: false,
    },
    apparancePlaie: {
      seche: true,
      humide: false,
      necroseAvecFistule: false,
      oedeme: false,
    },
    peauPourtour: {
      intacte: true,
      maceration: false,
      rose: false,
      rougeur: false,
      oedemePhlyctene: false,
      induration: false,
      allergies: false,
    },
    ecoulement: {
      quantite: '',
      serux: true,
      sanguinolent: false,
      seroSanguinolent: false,
      purulent: false,
    },
    materielEnPlace: {
      drain: true,
      meche: false,
      longueurCm: 10,
      pointsAgrafes: false,
    },
    nettoyage: {
      serumPhysiologique: true,
    },
    pansement: {
      sparadrap: true,
      tulleGras: false,
      protecteurCutane: false,
      compresse: true,
      bandage: false,
    },
  };


  currentNurse: any;
  formSubmitted: boolean = false;
  OperationChirurgicale: boolean = false;
  SchematiqueDesPlaies: boolean = false;


  constructor(
      private route: ActivatedRoute,
      private patientService: PatientService,
      private medicalAdminService: MedicalAdministrationServiceService,
      private router: Router,
      private nurseService: NurseService,
      private notificationService: NotificationServiceService,
      private surgicalOperationService: SurgicalOperationService,
      private woundService: WoundService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('id');
      this.loadPatientDetails();
    });

    this.currentNurse = this.nurseService.getCurrentNurse();
    if (this.currentNurse) {
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


  redirectToSchematiqueDesPlaies(): void {
    this.router.navigate(['/Schematique-Des-Plaies', this.patientId]);
  }


  openModalMedicalAdministrations() {
    this.fsModalMedicalAdministrations.nativeElement.style.display = 'block';
  }

  closeModalMedicalAdministrations() {
    this.fsModalMedicalAdministrations.nativeElement.style.display = 'none';
  }

  saveMedicalAdministration(): void {
    this.formSubmitted = true;

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
      this.notificationService.showWarning('Please fill in all required fields', 'Validation Error');
    }
  }

  isFormValid(): boolean {
    return Boolean(
        this.medicalAdministration.dateDuSemain &&
        this.medicalAdministration.doctor &&
        this.medicalAdministration.prescription &&
        this.medicalAdministration.nomMedicament &&
        this.medicalAdministration.poids &&
        this.medicalAdministration.time &&
        this.medicalAdministration.remarqueInfermier
    );
  }

  openModalOperationChirurgicale() {
    this.fsModalOperationChirurgicale.nativeElement.style.display = 'block';
  }




  saveOperationChirurgicale(): void {
    this.OperationChirurgicale = true;

    if (this.isOperationChirurgicaleFormValid()) {
      this.surgicalOperationService
          .createSurgicalOperation({
            ...this.operationChirurgicale,
            patientId: this.patientId,
          })
          .subscribe(
              (response) => {
                console.log('Surgical Operation saved successfully:', response);
                this.notificationService.showSuccess('Surgical Operation saved successfully', 'Success');
                this.loadPatientDetails();
                this.closeModalOperationChirurgicale();
              },
              (error) => {
                console.error('Error saving Surgical Operation:', error);
                this.notificationService.showError('Error saving Surgical Operation', 'Error');
              }
          );
    } else {
      this.notificationService.showWarning('Please fill in all required fields', 'Validation Error');
    }
  }


  isOperationChirurgicaleFormValid(): boolean {
    return Boolean (
        this.operationChirurgicale.preOperative.datepreOperative &&
        this.operationChirurgicale.preOperative.lieupreOperative &&
        this.operationChirurgicale.preOperative.initialspreOperative &&
        this.operationChirurgicale.drains.typedrains &&
        this.operationChirurgicale.drains.aspirationdrains &&
        this.operationChirurgicale.drains.enleveenPlacedrains &&
        this.operationChirurgicale.drains.enPlacedrains.initenPlacedrains &&
        this.operationChirurgicale.drains.enPlacedrains.installeenPlacedrains &&
        this.operationChirurgicale.drains.enPlacedrains.enleveenPlacedrains &&
        this.operationChirurgicale.postOperative.soinpostOperative &&
        this.operationChirurgicale.postOperative.datepostOperative &&
        this.operationChirurgicale.postOperative.lieupostOperative &&
        this.operationChirurgicale.postOperative.initialspostOperative &&
        this.operationChirurgicale.observations

    );
  }

  closeModalOperationChirurgicale() {
    this.fsModalOperationChirurgicale.nativeElement.style.display = 'none';
  }

  openModalSchematiqueDesPlaies() {
    this.fsModalSchematiqueDesPlaies.nativeElement.style.display = 'block';
  }


  saveSchematique(): void {
    this.SchematiqueDesPlaies = true;

      this.woundService
          .createWound({
            ...this.wound,
            patientId: this.patientId, // Add the patientId to the request payload
          })
          .subscribe(
              (response) => {
                console.log('Wound saved successfully:', response);
                this.notificationService.showSuccess('Wound saved successfully', 'Success');
                this.loadPatientDetails();
                this.closeModalSchematiqueDesPlaies();
              },
              (error) => {
                console.error('Error saving Wound:', error);
                this.notificationService.showError('Error saving Wound', 'Error');
              }
          );


  }




  isSchematiqueFormValid(){

  }


  closeModalSchematiqueDesPlaies() {
    this.SchematiqueDesPlaies = false;
    this.fsModalSchematiqueDesPlaies.nativeElement.style.display = 'none';
  }





}
