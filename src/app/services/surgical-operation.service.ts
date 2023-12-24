import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SurgicalOperationService {

  private apiUrl = 'http://localhost:3000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  createSurgicalOperation(patientId: string, surgicalOperationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients/${patientId}/surgicalOperations`, surgicalOperationData);
  }

  getAllSurgicalOperations(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients/${patientId}/surgicalOperations`);
  }

  getSurgicalOperationById(surgicalOperationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/surgicalOperations/${surgicalOperationId}`);
  }

  updateSurgicalOperation(surgicalOperationId: string, surgicalOperationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/surgicalOperations/${surgicalOperationId}`, surgicalOperationData);
  }

  deleteSurgicalOperation(surgicalOperationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/surgicalOperations/${surgicalOperationId}`);
  }

  getAllSurgicalOperationRecords(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients/${patientId}/surgicalOperations/records`);
  }
}