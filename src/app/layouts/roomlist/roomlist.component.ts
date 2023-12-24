import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../services/room.service";

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent implements OnInit {

    rooms: any[] = [];
    pagedRooms: any[] = [];
    pageSize = 6; // Adjust this based on how many rooms you want to display per page
    currentPage = 1;
    pages: number[] = [];

    constructor(private roomService: RoomService) {}

    ngOnInit(): void {
        this.loadRooms();
    }

    loadRooms(): void {
        this.roomService.getAllRooms().subscribe(
            (data) => {
                this.rooms = data;
                this.updatePagedRooms();
            },
            (error) => {
                console.error('Error fetching rooms:', error);
            }
        );
    }

    updatePagedRooms(): void {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.pagedRooms = this.rooms.slice(startIndex, startIndex + this.pageSize);

        // Update the pagination links
        const pageCount = Math.ceil(this.rooms.length / this.pageSize);
        this.pages = Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    changePage(page: number): void {
        this.currentPage = page;
        this.updatePagedRooms();
    }

    removeRoom(roomId: string): void {
        this.roomService.deleteRoom(roomId).subscribe(
            () => {
                // If removal is successful, update the room list
                this.loadRooms();
            },
            (error) => {
                console.error('Error removing room:', error);
            }
        );
    }

    editRoom(room: any) {
// You can do whatever you want with the selected room
        console.log(room);
        //modifier



    }
}