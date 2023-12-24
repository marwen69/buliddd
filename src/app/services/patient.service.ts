// patient.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) {}


  // patient.service.ts
  createPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patientsadd`, patientData);
  }


    getAllPatientsDetails(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/details`);
    }


  getPatientById(patientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patients/${patientId}`);
  }

  updatePatient(patientId: string, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatepatients/${patientId}`, patientData);
  }

  deletePatient(patientId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletepatients/${patientId}`);
  }

  getPatientByMatricule(matricule: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getPatientByMatricule/${matricule}`);
  }
}
