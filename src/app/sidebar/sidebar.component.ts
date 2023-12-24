import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NurseService} from "../services/nurse.service";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    submenu?: RouteInfo[];
}
// @ts-ignore
export const ROUTES: RouteInfo[] = [
/*
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
*/
    { path: '/Mangment', title: 'Services',  icon:'pe-7s-note2', class: '' },
    { path: '/userform', title: 'Patient',  icon:'pe-7s-note2', class: '' },
    { path: '/Chamber', title: 'Chamber',  icon:'pe-7s-note2', class: '' },
    { path: '/userlist', title: 'uselist',  icon:'pe-7s-note2', class: '' },
    { path: '/patient-details/:id', title: 'uselist',  icon:'pe-7s-note2', class: 'hide' },


    /*{ path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: '/login', title: 'login',  icon:'pe-7s-bell', class: '' },*/

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

    constructor(private router: Router, private nurseService: NurseService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };


    logout(): void {
        // Clear nurse session and navigate to the login page
        this.nurseService.clearNurseSession();
        this.router.navigate(['']);
    }
}
