import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { SettingsSideBarComponent } from './settings/settings-side-bar/settings-side-bar.component';
import { UpdateComponent } from './users/update/update.component';
import { ViewComponent } from './users/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ViewComponent },
  { path: 'profile/update', component: UpdateComponent },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients.module').then(mod => mod.PatientsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboards/dashboards.module').then(mod => mod.DashboardsModule)
  },
  {
    path: 'settings', component: SettingsSideBarComponent,
    loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule)
  },
  {
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then(mod => mod.LogsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
