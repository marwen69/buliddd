import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {BlockService} from "../../services/bloc.service";
import {RoomService} from "../../services/room.service";
import {NotificationServiceService} from "../../services/notification-service.service";
import {Router} from "@angular/router";



@Component({
    selector: 'app-userform',
    templateUrl: './userform.component.html',
    styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {
    newPatient: any = {
        firstName: '',
        lastName: '',
        age: undefined,
        gender: '',
        blocId: '', // Change from bloc to blocId
        admissionDate: '',
        maritalStatus: '',
        educationLevel: '',
        medicalData: {
            diagnostic: '',
        },
        clinicalParticulars: {
            allergy: false,
            allergyDescription: '',
            surgicalHistory: false,
            surgicalDescription: '',
        },
        surveillanceElements: {
            vitalSigns: {
                pulse: 0,
                bloodPressure: '',
                respiratoryRate: 0,
                temperature: 0,
                spO2: 0,
            },
            alerts: {
                weight: 0,
                height: 0,
                BMI: 0,
                observations: '',
            },
        },
        roomId: '',
    };

    blocs: any[] = [];
    rooms: any[] = [];

    constructor(
        private patientService: PatientService,
        private blockService: BlockService,
        private roomService: RoomService,
        private notificationService: NotificationServiceService,
        private router: Router
    ) {}

    fetchBlocs(): void {
        this.blockService.getAllBlocks().subscribe(
            (response: any[]) => {
                this.blocs = response;
            },
            (error) => {
                console.error(error);
                // Handle error, show an error message, etc.
            }
        );
    }

    onSubmit(): void {
        // Log the newPatient object to the console before making the request
        console.log(this.newPatient);

        this.patientService.createPatient(this.newPatient).subscribe(
            (response) => {
                console.log(response);
                // Handle success, e.g., show a success message, navigate to another page, etc.
                this.notificationService.showSuccess('Patient ajouté avec succès!', 'Success');
                this.router.navigate(['/userlist']);
            },
            (error) => {
                console.error(error);
                // Handle error, show an error message, etc.
                this.notificationService.showError('Erreur lors de l\'ajout du patient', 'Error');
            }
        );
    }


    onBlocChange(): void {
        // Fetch rooms when the bloc selection changes
        if (this.newPatient.blocId) {
            this.fetchRoomsByBloc(this.newPatient.blocId);
        }
        console.log('bloc selection changed:', this.newPatient.blocId);
    }

    onRoomChange(): void {
        console.log('Room selection changed:', this.newPatient.roomId);
        // Add any additional logic you need when the room selection changes
    }

    fetchRoomsByBloc(blocId: string): void {
        this.roomService.getAllRoomsByBloc(blocId).subscribe((rooms) => {
            this.rooms = rooms;
        });
    }

    calculateBMI(): number {
        // Calculate BMI using weight (in kilograms) and height (in meters)
        const weight = this.newPatient.surveillanceElements.alerts.weight;
        const height = this.newPatient.surveillanceElements.alerts.height;
        if (weight && height) {
            const bmi = weight / (height * height);
            return bmi;
        }

        return 0;
    }


    ngOnInit(): void {
        this.fetchBlocs();
    }



}