import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsSideBarComponent } from './settings-side-bar/settings-side-bar.component';
import { CptComponent } from './cpt/cpt.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UpdateDoctorComponent } from './popups/update-doctor/update-doctor.component';
import { UpdateCptComponent } from './popups/update-cpt/update-cpt.component';

const routes: Routes = [
  { path: '', redirectTo: 'doctors', pathMatch: 'full'},
  { path: 'doctors', component: DoctorsComponent},
  { path: 'cpt', component: CptComponent},
];

@NgModule({
  declarations: [
    SettingsSideBarComponent,
    CptComponent,
    DoctorsComponent,
    UpdateDoctorComponent,
    UpdateCptComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
