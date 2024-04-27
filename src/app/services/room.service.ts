// src/app/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    private apiUrl = 'http://nursenet.tech/api'; // Replace with your API base URL

    constructor(private http: HttpClient) {}

    createRoom(roomData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/roomsadd`, roomData);
    }

    getRoomById(roomId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/rooms/${roomId}`);
    }

    getAllRooms(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/rooms`);
    }

    updateRoom(roomId: string, roomData: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/rooms/${roomId}`, roomData);
    }

    deleteRoom(roomId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/rooms/${roomId}`);
    }

    getAllRoomsByBloc(blocId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/roomsbybloc/${blocId}`);
    }
}
