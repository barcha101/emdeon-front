import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { InterceptorModule } from './services/http-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InitialsPipe } from './pipes/initials.pipe';
import { ModelChangeDebounceDirective } from './directives/model-change-debounce.directive';
import { GenericConfirmationComponent } from './components/popups/generic-confirmation/generic-confirmation.component';
import { ChangeUserPasswordComponent } from './components/popups/change-user-password/change-user-password.component';
import { SortPipe } from './pipes/sort.pipe';
import { AddEraComponent } from './components/popups/add-era/add-era.component';

@NgModule({
  declarations: [
    SidebarComponent,
    PaginatorComponent,
    InitialsPipe,
    ModelChangeDebounceDirective,
    GenericConfirmationComponent,
    ChangeUserPasswordComponent,
    SortPipe,
    AddEraComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    MatDialogModule,
    InterceptorModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule,
    MatTooltipModule,
    MatRadioModule
  ],
  exports: [
    ReactiveFormsModule, FormsModule,
    MatDialogModule,
    InterceptorModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    SidebarComponent,
    PaginatorComponent,
    RouterModule,
    InitialsPipe,
    ModelChangeDebounceDirective,
    SortPipe,
    MatTooltipModule,
    MatRadioModule
  ]
})
export class SharedModule { }
