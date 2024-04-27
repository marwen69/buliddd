import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WoundService {
  private baseUrl = 'http://nursenet.tech/api'; // Adjust this URL according to your backend API

  constructor(private http: HttpClient) { }

  createWound(woundData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crete`, woundData);
  }

  getWoundById(woundId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${woundId}`);
  }

  updateWound(woundId: string, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${woundId}`, updateData);
  }

  deleteWound(woundId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${woundId}`);
  }

  getAllWoundsForPatient(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patient/${patientId}`);
  }
}

export class SchematiqueService {
}