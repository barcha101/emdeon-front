import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { UpdateComponent } from './users/update/update.component';
import { ViewComponent } from './users/view/view.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ViewComponent, canActivate: [AuthGuardService] },
  { path: 'profile/update', component: UpdateComponent, canActivate: [AuthGuardService] },
  {
    path: 'app',
    loadChildren: () => import('./patients/patients.module').then(mod => mod.PatientsModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./dashboards/dashboards.module').then(mod => mod.DashboardsModule)
  },
  {
    path: 'logs',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./logs/logs.module').then(mod => mod.LogsModule)
  },
  {
    path: 'bots',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./bots/bots.module').then(mod => mod.BotsModule)
  },
  {
    path: 'claims',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./claims/claims.module').then(mod => mod.ClaimsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
