import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'superadmin', component: SuperadminComponent}
];

@NgModule({
  declarations: [
    SuperadminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardsModule { }
