import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFilesComponent } from './view-files/view-files.component';
import { ViewIndFileComponent } from './view-ind-file/view-ind-file.component';
import { ViewIndPatientComponent } from './view-ind-patient/view-ind-patient.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ViewFilesDetailedComponent } from './view-files-detailed/view-files-detailed.component';
import { BulkImportClaimsComponent } from './bulk-import-claims/bulk-import-claims.component';
import { EraListComponent } from './era-list/era-list.component';
import { AllIndClaimsComponent } from './all-ind-claims/all-ind-claims.component';

const routes: Routes = [
  { path: '', component: ViewFilesComponent},
  { path: 'files-list', component: ViewFilesComponent},
  { path: 'files-list-detailed', component: ViewFilesDetailedComponent},
  { path: 'view-file/:id', component: ViewIndFileComponent},
  { path: 'view-patient/:id', component: ViewIndPatientComponent},
  { path: 'era-list', component: EraListComponent},
  { path: 'all', component: AllIndClaimsComponent}
];

@NgModule({
  declarations: [
    ViewFilesComponent,
    ViewIndFileComponent,
    ViewIndPatientComponent,
    ViewFilesDetailedComponent,
    BulkImportClaimsComponent,
    EraListComponent,
    AllIndClaimsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ClaimsModule { }
