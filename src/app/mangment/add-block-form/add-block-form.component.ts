import {Component, OnInit, Output} from '@angular/core';
import {EventEmitter} from "protractor";
import {BlockService} from "../../services/bloc.service";
import {NotificationServiceService} from "../../services/notification-service.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-block-form',
  templateUrl: './add-block-form.component.html',
  styleUrls: ['./add-block-form.component.scss']
})
export class AddBlockFormComponent implements OnInit {


  newBlockName: string;
  newBlockDescription: string;
  newBlockImage: string;
  selectedImage: string;

  // ... other existing code ...
  constructor(private blockService: BlockService, private notificationService: NotificationServiceService,private sanitizer: DomSanitizer,private router: Router) {}
  addNewBlock() {
    const newBlock = {
      name: this.newBlockName,
      description: this.newBlockDescription,
      image: this.newBlockImage,
    };

    // Call the service method to add the new block
    this.blockService.createBlock(newBlock).subscribe(
        (response) => {
          // Handle success, e.g., show a success notification
          this.notificationService.showSuccess('Block added successfully!', 'Success');
          // ... any other necessary actions after adding the block
        },
        (error) => {
          // Handle error, e.g., show an error notification
          this.notificationService.showError('Error adding block!', 'Error');
          console.error('Error adding block:', error);
        }
    );
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Sanitize the image source
        // @ts-ignore
        this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }


  ngAfterViewInit() {
    // Open the modal when the view has been initialized
    this.openModal();
  }

  openModal() {
    // @ts-ignore
    $('#fsModal').modal('show');
  }

  redirectToDefault() {
    // Close the modal
    // @ts-ignore
    $('#fsModal').modal('hide');

    // Redirect to the "/management" route
    this.router.navigate(['/Mangment']);
  }

  redirectToPrimary() {
    // Close the modal
    // @ts-ignore
    $('#fsModal').modal('hide');

    // Redirect to the "/management" route
    this.router.navigate(['/Mangment']);
  }

}
