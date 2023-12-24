import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent implements OnInit {

    rooms: any[] = [];
    pagedRooms: any[] = [];
    pageSize = 4; // Set to 4 to display rooms in a 2x2 grid
    currentPage = 0;
    pageSizeOptions: number[] = [4]; // Add this line to define pageSizeOptions for mat-paginator

    @ViewChild(MatPaginator) matPaginator: MatPaginator; // Add this line to access mat-paginator

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
        const startIndex = this.currentPage * this.pageSize;
        this.pagedRooms = this.rooms.slice(startIndex, startIndex + this.pageSize);
    }

    changePage(event: PageEvent): void {
        this.currentPage = event.pageIndex;
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
        // modifier
    }
}