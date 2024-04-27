import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import {MedicalAdministrationServiceService} from "../../services/medical-administration-service.service";
import {NurseService} from "../../services/nurse.service";
import {NotificationServiceService} from "../../services/notification-service.service";
import {SurgicalOperationService} from "../../services/surgical-operation.service";
import {WoundService} from "../../services/schematique.service";



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
  selector: 'app-new-woud',
  templateUrl: './new-woud.component.html',
  styleUrls: ['./new-woud.component.scss']
})
export class NewWoudComponent implements OnInit {
  patientId: string;
  patientDetails: any;
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('id');
      this.loadPatientDetails();
    });

    this.currentNurse = this.nurseService.getCurrentNurse();
    if (this.currentNurse) {
          }
  }



  saveWound() {
    this.woundService.createWound(this.wound).subscribe(
        (response) => {
          console.log('Wound saved successfully:', response);
          // Optionally, you can reset the form or perform any other actions here
        },
        (error) => {
          console.error('Error saving wound:', error);
          // Handle the error as needed
        }
    );
  }
}
