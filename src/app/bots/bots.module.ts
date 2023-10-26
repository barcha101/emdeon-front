import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBotsComponent } from './list-bots/list-bots.component';
import { ViewBotComponent } from './view-bot/view-bot.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UpdateBotComponent } from './update-bot/update-bot.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: ListBotsComponent},
  { path: 'view/:id', component: ViewBotComponent}
];

@NgModule({
  declarations: [
    ListBotsComponent,
    ViewBotComponent,
    UpdateBotComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BotsModule { }
