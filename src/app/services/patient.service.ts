// patient.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://nursenet.tech/api'; // Replace with your API base URL

  constructor(private http: HttpClient) {}


  // patient.service.ts
  createPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patientsadd`, patientData);
  }


    getAllPatientsDetails(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/allPatientsDetails`);
    }


  getPatientById(patientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patients/${patientId}`);
  }

  updatePatient(patientId: string, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatepatients/${patientId}`, patientData);
  }

  deletePatientByMatricule(matricule: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleatpatients/${matricule}`);
  }
  getPatientByMatricule(matricule: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getPatientByMatricule/${matricule}`);
  }
}
