import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicalAdministrationServiceService {

  private apiUrl = 'http://nursenet.tech/api'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  createMedicalAdministration(medicalAdministrationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicaladministrations`, medicalAdministrationData);
  }

  getAllMedicalAdministrationsForPatient(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medicaladministrations/${patientId}`);
  }

  getMedicalAdministrationById(medicalAdministrationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medicaladministrations/${medicalAdministrationId}`);
  }

  updateMedicalAdministration(medicalAdministrationId: string, medicalAdministrationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/medicaladministrations/${medicalAdministrationId}`, medicalAdministrationData);
  }

  deleteMedicalAdministration(medicalAdministrationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/medicaladministrations/${medicalAdministrationId}`);
  }
}
