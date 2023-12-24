// block.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all blocks
  getAllBlocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blocks`);
  }

  // Fetch a specific block by ID
  getBlockById(blockId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${blockId}`);
  }

  // Create a new block
  createBlock(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/blocksadd`, data);
  }

  // Update a block by ID
  updateBlock(blockId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${blockId}`, data);
  }

  // Delete a block by ID
  deleteBlock(blockId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/blocks/${blockId}`);
  }
}
