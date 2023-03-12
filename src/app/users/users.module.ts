import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'list', component: ListComponent},
  { path: 'view/:id', component: ViewComponent},
  { path: 'edit/:id', component: UpdateComponent},
  { path: 'add', component: UpdateComponent}
];

@NgModule({
  declarations: [
    ListComponent,
    UpdateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
