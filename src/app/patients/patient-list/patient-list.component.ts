import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { environment } from './../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from './../../shared/services/patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private patientsService: PatientsService
  ) { }

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;
  public filterSearch = '';
  public filterStatus = '';
  public filterPlanStatus = '';

  public filterDays: any = '';

  public sortKey = 'fName';
  public sortDir = false;


  ngOnInit(): void {
    this.getPatients();
  }

  filterUpdated() {
    this.pageNum = 1;
    this.getPatients();
  }

  getPatients() {
    let sort: any = {};
    sort[this.sortKey] = this.sortDir ? 1 : -1;
    this.patientsService.list({
      query: {
        filterSearch: this.filterSearch,
        filterIsArchive: false,
        filterDays: this.filterDays,
        filterPlanStatus: this.filterPlanStatus
      },
      sort,
      pagination: {
        perPage: this.perPage,
        pageNum: this.pageNum
      }
    }).subscribe((d: any) => {
      this.list = d.list;
      this.totalCount = d.count;
    });
  }

  perPageUpdated(perPage: any){
    this.perPage = parseInt(perPage);
    this.filterUpdated();
  }

  pageChanged(pageNum: any) {
    this.pageNum = pageNum;
    this.getPatients();
  }

  

  exportPatients(){
    this.patientsService.export({
      query: {
        filterSearch: this.filterSearch,
        filterIsArchive: false,
        filterDays: this.filterDays,
        filterPlanStatus: this.filterPlanStatus
      }
    }).subscribe((d: any) => {
      this.snackBarService.downloadFileWithUrl('exportedPatients.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/' + d['fileUrl']);
    });
  }

  downloadSampleImport(){
    this.snackBarService.downloadFileWithUrl('patientBulkImportSample.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/patientBulkImportSample.xlsx');
  }

}
