import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsListComponent } from './logs-list/logs-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ViewDataComponent } from './view-data/view-data.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: LogsListComponent}
];

@NgModule({
  declarations: [
    LogsListComponent,
    ViewDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxJsonViewerModule,
    RouterModule.forChild(routes)
  ]
})
export class LogsModule { }
