import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import {LoaderServiceService} from "./services/loader-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(public location: Location, private loaderService: LoaderServiceService) {}

    ngOnInit() {
        // Show loader initially
        this.loaderService.showLoader();

        // Simulate an asynchronous operation (replace with your actual asynchronous operation)
        setTimeout(() => {
            // Hide loader after 40 seconds (adjust as needed)
            this.loaderService.hideLoader();
        }, 40000); // 40 seconds
    }

    isMap(path) {
        const titlee = this.location.prepareExternalUrl(this.location.path()).slice(1);

        return path !== titlee;
    }
}