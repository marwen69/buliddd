import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NurseService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual API URL
  private currentNurse: any; // Modify the type as per your nurse object structure
  constructor(private http: HttpClient) {}


  loginNurse(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/loginnurses`, credentials);
  }

  setSession(response: any): void {
    console.log('Login API Response:', response);

    if (response && response.nurse && response.nurse.firstName) {
      localStorage.setItem('user', JSON.stringify(response.nurse));
      localStorage.setItem('currentNurseName', response.nurse.firstName);
    }
  }

  getCurrentNurse(): any {
    const nurseData = localStorage.getItem('user');
    return nurseData ? JSON.parse(nurseData) : null;
  }

  getCurrentNurseName(): string | null {
    return localStorage.getItem('currentNurseName');
  }

  clearNurseSession(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('currentNurseName');
  }


  isLoggedIn(): boolean {
    return !!this.getCurrentNurse();
  }

  getAllNurses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getNurseById(nurseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nurseId}`);
  }








  createNurse(nurseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, nurseData);
  }

  updateNurse(nurseId: string, nurseData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${nurseId}`, nurseData);
  }

  deleteNurse(nurseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${nurseId}`);
  }
}
