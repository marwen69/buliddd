import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BlockService} from "../services/bloc.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

import {NotificationServiceService} from "../services/notification-service.service";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {RoomService} from "../services/room.service";

@Component({
  selector: 'app-mangment',
  templateUrl: './mangment.component.html',
  styleUrls: ['./mangment.component.scss']
})

export class MangmentComponent implements OnInit {
    blocks: any[] = [];
    pageSize = 2;
    pageIndex = 0;
    length = 0;
    newBlockName: string = '';
    newBlockDescription: string = '';

    @ViewChild('fsModal') fsModal: ElementRef;
    @ViewChild('fsModalRoom') fsModalRoom: ElementRef;

    newRoomNumber: string = '';
    newRoomCapacity: number = 0;

    selectedBlock: any; // Add this line




    constructor(
        private blockService: BlockService,
        private notificationService: NotificationServiceService,
        private roomService: RoomService
    ) {}

    ngOnInit(): void {
        this.blockService.getAllBlocks().subscribe(
            (blocks) => {
                this.blocks = blocks;
            },
            (error) => {
                console.error('Error fetching blocks:', error);
            }
        );
    }

    onPageChange(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
    }

    addNewBlock() {
        // Check if block name is provided
        if (!this.newBlockName) {
            this.notificationService.showError('Block name is required', 'Error');
            return;
        }

        const newBlock = {
            name: this.newBlockName,
            description: this.newBlockDescription
        };

        this.blockService.createBlock(newBlock).subscribe(
            (addedBlock) => {
                this.blocks = [...this.blocks, addedBlock];
                this.notificationService.showSuccess('Block added successfully', 'Success');
                this.newBlockName = '';
                this.newBlockDescription = '';
                this.closeModal();
            },
            (error) => {
                console.error('Error adding block:', error);
                this.notificationService.showError('Error adding block', 'Error');
            }
        );
    }

    openModal() {
        this.fsModal.nativeElement.style.display = 'block';
    }

    closeModal() {
        this.fsModal.nativeElement.style.display = 'none';
    }



    closeModalRoom() {
        // Code to close the modal
        this.fsModalRoom.nativeElement.style.display = 'none';
    }






    deleteBlock(block: any): void {
        this.notificationService.showWarning('Are you sure you want to delete this block?', 'Delete Confirmation');
        this.notificationService.onConfirmation.pipe(
            take(1)
        ).subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.blockService.deleteBlock(block._id).subscribe(
                    () => {
                        this.blocks = this.blocks.filter(b => b._id !== block._id);
                        this.notificationService.showSuccess('Block deleted successfully', 'Success');
                    },
                    (error) => {
                        console.error('Error deleting block:', error);
                        this.notificationService.showError('Error deleting block', 'Error');
                    }
                );
            }
        });
    }



    openModalRoom(block: any) {
        this.selectedBlock = block; // Set the selectedBlock
        this.fsModalRoom.nativeElement.style.display = 'block';
    }

    // Existing methods...

    Addroom(): void {
        // Ensure that selectedBlock is set before proceeding
        if (!this.selectedBlock || !this.selectedBlock._id) {
            console.error('Block ID is required.');
            return;
        }

        // Prepare room data
        const roomData = {
            roomNumber: this.newRoomNumber,
            capacity: this.newRoomCapacity,
            blockId: this.selectedBlock._id, // Use selectedBlock._id
            // Add any other properties as needed
        };

        // Use RoomService to create the room
        this.roomService.createRoom(roomData).subscribe(
            (response) => {
                console.log('Room created successfully:', response);

                // Show success toastr notification
                this.notificationService.showSuccess('Room added successfully', 'Success');

                // Close the modal after adding the room
                this.closeModalRoom();

                // Clear input fields
                this.newRoomNumber = '';
                this.newRoomCapacity = 0;
            },
            (error) => {
                console.error('Error creating room:', error);

                // Show error toastr notification
                this.notificationService.showError('Error adding room', 'Error');
            }
        );
    }

    closeModalblock() {
        this.fsModal.nativeElement.style.display = 'none';
    }
}