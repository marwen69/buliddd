import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen = true;
  hideNavLinks = false; // Set to true by default

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check the current URL and hide nav links if necessary
    if (this.router.url === '/login' || this.router.url === '/register') {
      this.hideNavLinks = true;
    }

    this.router.events.subscribe(() => {
      // Check the current URL and hide nav links if necessary
      if (this.router.url === '/login' || this.router.url === '/register') {
        this.hideNavLinks = true;
      } else {
        this.hideNavLinks = false;
      }
    });
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
