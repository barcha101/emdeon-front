import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list/patient-list.component';
import { BulkImportPatientsComponent } from './bulk-import-patients/bulk-import-patients.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { PatientVisitsComponent } from './patient-visits/patient-visits.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { PatientFinanceComponent } from './patient-finance/patient-finance.component';
import { RecoinciliationComponent } from './recoinciliation/recoinciliation.component';

const routes: Routes = [
  { path: 'list', component: PatientListComponent},
  { path: 'bulk-upload', component: BulkImportPatientsComponent},
  { path: 'view/:id', component: ViewPatientComponent},
  { path: 'update/:id', component: UpdatePatientComponent},
  { path: 'add', component: UpdatePatientComponent},
  { path: 'visits', component: PatientVisitsComponent},
  { path: 'finance', component: PatientFinanceComponent},
  { path: 'reconciliation', component: RecoinciliationComponent}
];

@NgModule({
  declarations: [
    PatientListComponent,
    BulkImportPatientsComponent,
    ViewPatientComponent,
    PatientVisitsComponent,
    UpdatePatientComponent,
    PatientFinanceComponent,
    RecoinciliationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientsModule { }
