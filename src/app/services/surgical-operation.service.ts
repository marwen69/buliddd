import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SurgicalOperationService {
  private baseUrl = 'http://nursenet.tech/api';

  constructor(private http: HttpClient) { }

  createSurgicalOperation(surgicalOperationData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/surgicalOperations`, surgicalOperationData);
  }

  getSurgicalOperationById(surgicalOperationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/surgicalOperations/${surgicalOperationId}`);
  }

  updateSurgicalOperation(surgicalOperationId: string, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/surgicalOperations/${surgicalOperationId}`, updateData);
  }

  deleteSurgicalOperation(surgicalOperationId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/surgicalOperations/${surgicalOperationId}`);
  }

  getAllSurgicalOperations(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/surgicalOperations/${patientId}`);
  }

  getAllSurgicalOperationRecords(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/surgicalOperations/getAllRecords/${patientId}`);
  }
}