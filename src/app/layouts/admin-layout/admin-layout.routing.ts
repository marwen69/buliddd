import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MangmentComponent } from 'app/mangment/mangment.component';
import { LoginformComponent } from 'app/layouts/auth/loginform/loginform.component';
import {UserformComponent} from "../userform/userform.component";
import {AddBlockFormComponent} from "../../mangment/add-block-form/add-block-form.component";
import {RoomlistComponent} from "../roomlist/roomlist.component";
import {UserlistComponent} from "../userlist/userlist.component";
import {PatientDetailsComponent} from "../patient-details/patient-details.component";
import {MedicalAdministrationsComponent} from "../medical-administrations/medical-administrations.component";
import {SurgicalOperationComponent} from "../surgical-operation/surgical-operation.component";
import {WelcomeComponent} from "../welcome/welcome.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'Mangment',       component: MangmentComponent },
    { path: 'userform',       component: UserformComponent },
    { path: 'userlist',       component: UserlistComponent },

    { path: 'welcome',       component: WelcomeComponent },
    { path: 'medical-administrations/:id', component: MedicalAdministrationsComponent },
    { path: 'surgical-operations/:id', component: SurgicalOperationComponent },


    { path: 'patient-details/:id',  component: PatientDetailsComponent },

    { path: 'Chamber',  component: RoomlistComponent },
    {path:  'add',         component: AddBlockFormComponent},
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },




];
