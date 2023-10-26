import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from '../../shared/services/patients.service';

@Component({
  selector: 'emdeon-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private patientsService: PatientsService
  ) { }

  public filesList: any = [];

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

  public allSelected = false;
  public bulkUpdateStatusModel: any = '';
  public bulkSelectedCount = 0;

  public statusOptsEligibility: any = ['Processing', 'Eligibility Found, SNS Pending', 'Found', 'Error'];

  public statusCounts: any = [];

  public selectedSourceFile = '';

  public noPatientFound = false;


  ngOnInit(): void {
    this.getPatients();
    this.getUploadedFileStats();
  }

  getUploadedFileStats(){
    this.patientsService.getUploadedFileStats().subscribe((d: any) => {
      this.filesList = d['files'];
    });
  }

  filterUpdated() {
    this.pageNum = 1;
    this.getPatients();
  }

  getPatients() {
    let sort: any = {};
    sort[this.sortKey] = this.sortDir ? 1 : -1;
    this.bulkSelectedCount = 0;
    this.allSelected = false;
    this.patientsService.list({
      query: {
        filterSearch: this.filterSearch,
        filterIsArchive: false,
        filterDays: this.filterDays,
        filterPlanStatus: this.filterPlanStatus,
        selectedSourceFile: this.selectedSourceFile
      },
      sort,
      pagination: {
        perPage: this.perPage,
        pageNum: this.pageNum
      }
    }).subscribe((d: any) => {
      this.list = d.list;
      this.totalCount = d.count;
      this.statusCounts = d.statusCounts;
      if(this.pageNum == 1 && !this.list.length){
        this.noPatientFound = true;
      }
    });
  }

  bulkUpdateStatus() {
    if(!this.bulkUpdateStatusModel){
      this.snackBarService.errorMessage('Select a status');
      return;
    }
    let selectedIds = [];
    for(const txn of this.list){
      if(txn.selected){
        selectedIds.push(txn._id);
      }
    }
    this.patientsService.bulkUpdateStatus({
      query: {
        filterSearch: this.filterSearch,
        filterIsArchive: false,
        filterDays: this.filterDays,
        filterPlanStatus: this.filterPlanStatus
      },
      allSelected: this.allSelected,
      bulkSelectedCount: this.bulkSelectedCount,
      selectedIds,
      bulkUpdateStatusModel: this.bulkUpdateStatusModel
    }).subscribe((d: any) => {
      this.getPatients();
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

  allSelectionUpdated(){
    if(this.allSelected){
      for(const txn of this.list){
        txn.selected = true;
      }
      this.bulkSelectedCount = this.totalCount;
    } else {
      for(const txn of this.list){
        txn.selected = false;
      }
      this.bulkSelectedCount = 0;
    }
  }

  selectionUpdated(){
    this.bulkSelectedCount = 0;
    this.allSelected = false;
    for(const txn of this.list){
      if(txn.selected){
        this.bulkSelectedCount++;
      }
    }
  }

  exportPatients(){
    this.patientsService.export({
      query: {
        filterSearch: this.filterSearch,
        filterIsArchive: false,
        filterDays: this.filterDays,
        filterPlanStatus: this.filterPlanStatus,
        selectedSourceFile: this.selectedSourceFile
      }
    }).subscribe((d: any) => {
      this.snackBarService.downloadFileWithUrl('exportedPatients.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/' + d['fileUrl']);
    });
  }

  downloadSampleImport(){
    this.snackBarService.downloadFileWithUrl('Bulk-Import-Sample-Format.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/Bulk-Import-Sample-Format.xlsx');
  }

}