import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MangmentComponent } from './mangment/mangment.component';
import { LandingComponent } from './landing/landing.component';
import { LoginformComponent } from './layouts/auth/loginform/loginform.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './shared/navbarlanding/navbar.component';
import { RegisterformComponent } from './layouts/auth/registerform/registerform.component';
import { ForgetpasswordComponent } from './layouts/auth/forgetpassword/forgetpassword.component';
import { AddBlockFormComponent } from './mangment/add-block-form/add-block-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserformComponent } from './layouts/userform/userform.component';

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



import { ToastrModule } from 'ngx-toastr';
import {BrowserModule} from "@angular/platform-browser";
import { RoomlistComponent } from './layouts/roomlist/roomlist.component';
import { UserlistComponent } from './layouts/userlist/userlist.component';
import { PatientDetailsComponent } from './layouts/patient-details/patient-details.component';
import { MedicalAdministrationsComponent } from './layouts/medical-administrations/medical-administrations.component';
import { SurgicalOperationComponent } from './layouts/surgical-operation/surgical-operation.component';
import { WelcomeComponent } from './layouts/welcome/welcome.component';
import {LoaderServiceService} from "./services/loader-service.service";
import { SchematiqueComponent } from './layouts/schematique/schematique.component';
import { NewWoudComponent } from './layouts/new-woud/new-woud.component';
import { WouldComponent } from './layouts/would/would.component';





@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        AppRoutingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatStepperModule,

        MatInputModule,
        MatButtonModule,
        MatIconModule,

        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,


        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()


    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MangmentComponent,
    LandingComponent,
    LoginformComponent,
    FooterComponent,
    NavbarComponent,
    RegisterformComponent,
    ForgetpasswordComponent,
    AddBlockFormComponent,
    UserformComponent,
    RoomlistComponent,
    UserlistComponent,
    PatientDetailsComponent,
    MedicalAdministrationsComponent,
    SurgicalOperationComponent,
    WelcomeComponent,
    SchematiqueComponent,
    NewWoudComponent,
    WouldComponent,

  ],
    providers: [LoaderServiceService],

    bootstrap: [AppComponent]
})
export class AppModule { }
