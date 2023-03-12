import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { environment } from './../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from './../../shared/services/patients.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-recoinciliation',
  templateUrl: './recoinciliation.component.html',
  styleUrls: ['./recoinciliation.component.scss']
})
export class RecoinciliationComponent implements OnInit {

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
  public users: any = [];
  public idWiseUser: any = {};

  public sortKey = 'fName';
  public sortDir = false;

  ngOnInit(): void {
    this.getPatients();
    this.getUsers();
  }

  filterUpdated() {
    this.pageNum = 1;
    this.getPatients();
  }

  perPageUpdated(perPage: any){
    this.perPage = parseInt(perPage);
    this.filterUpdated();
  }

  getPatients() {
    let sort: any = {};
    sort[this.sortKey] = this.sortDir ? 1 : -1;
    this.patientsService.listForDoctorFinance({
      query: {
        filterSearch: this.filterSearch,
        filterIsArchive: false,
        who: 'reconciliation'
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

  getUsers(){
    this.usersService.list({
      query: {},
      pagination: {
        perPage: 1000,
        pageNum: 1
      }
    }).subscribe((d: any) => {
      this.users = d.list;
      this.users.forEach((user: any) => {
        this.idWiseUser[user._id] = user;
      });
    });
  }

  pageChanged(pageNum: any) {
    this.pageNum = pageNum;
    this.getPatients();
  }

  reconciled(patient: any, status: any){
    this.patientsService.reconciled({
      _id: patient._id,
      planId: patient.insurances._id,
      status
    }).subscribe(d => {
      this.ngOnInit();
    })
  }
}
