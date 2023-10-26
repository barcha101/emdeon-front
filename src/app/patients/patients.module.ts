import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list/patient-list.component';
import { BulkImportPatientsComponent } from './bulk-import-patients/bulk-import-patients.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { FilesListComponent } from './files-list/files-list.component';

const routes: Routes = [
  { path: '', component: FilesListComponent},
  { path: 'patient-list', component: PatientListComponent},
  { path: 'import-patients', component: BulkImportPatientsComponent},
  { path: 'view/:id', component: ViewPatientComponent},
  { path: 'update/:id', component: UpdatePatientComponent},
  { path: 'add', component: UpdatePatientComponent},
];

@NgModule({
  declarations: [
    PatientListComponent,
    BulkImportPatientsComponent,
    ViewPatientComponent,
    UpdatePatientComponent,
    FilesListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientsModule { }
