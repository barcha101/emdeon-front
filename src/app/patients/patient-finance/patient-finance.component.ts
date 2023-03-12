import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { environment } from './../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from './../../shared/services/patients.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-patient-finance',
  templateUrl: './patient-finance.component.html',
  styleUrls: ['./patient-finance.component.scss']
})
export class PatientFinanceComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private patientsService: PatientsService,
    private usersService: UsersService
  ) { }

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;
  public filterSearch = '';

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
    this.patientsService.listForDoctorFinance({
      query: {
        filterSearch: this.filterSearch,
        filterIsArchive: false,
        who: 'finance'
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

  submitCodes(patient: any){
    this.patientsService.markComplete({
      _id: patient._id,
      planId: patient.insurances._id
    }).subscribe(d => {
      this.ngOnInit();
    })
  }
}
