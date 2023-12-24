import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginformComponent } from './layouts/auth/loginform/loginform.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import {RegisterformComponent} from "./layouts/auth/registerform/registerform.component";
import {ForgetpasswordComponent} from "./layouts/auth/forgetpassword/forgetpassword.component";
import {UserformComponent} from "./layouts/userform/userform.component";
import {AddBlockFormComponent} from "./mangment/add-block-form/add-block-form.component";
import {RoomlistComponent} from "./layouts/roomlist/roomlist.component";
import {PatientDetailsComponent} from "./layouts/patient-details/patient-details.component";
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
    { path: 'login', component: LoginformComponent },
    { path: 'register', component: RegisterformComponent },
    { path: '', component: LandingComponent },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuardService], // Apply the guard to the entire admin layout
        children: [
            { path: '', loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule) },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}