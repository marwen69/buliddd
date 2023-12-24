import { Injectable } from '@angular/core';
import {NurseService} from "./nurse.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private nurseService: NurseService, private router: Router) {}

  canActivate(): boolean {
    if (this.nurseService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

