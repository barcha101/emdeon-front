import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { environment } from './../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from './../../shared/services/patients.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { DoctorsService } from 'src/app/shared/services/doctors.service';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.scss']
})
export class PatientVisitsComponent implements OnInit {

  @Input() showBreadcrumbs: Boolean = true;
  @Input() showShopFilter: Boolean = true;
  @Input() filterShop: String = '';
  @Input() showClientFilter: Boolean = true;
  @Input() filterClient: String = '';

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private patientsService: PatientsService,
    private usersService: UsersService,
    private doctorsService: DoctorsService
  ) { }

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;
  public filterSearch = '';
  public filterStatus = '';
  // public filterShop = '';
  // public filterClient = '';
  public copayOpts: any = ["Cash", 'Cheque', 'Credit Card'];

  public loggedInUser: any = {};
  public user: any = {};

  public docList: any = [];
  public idWiseDoc: any = {};

  public sortKey = 'fName';
  public sortDir = false;

  ngOnInit(): void {
    this.getPatients();
    this.loggedInUser = SessionStorageService.getGenericJSON('user');
    this.usersService.getUserDetails(this.loggedInUser._id).subscribe((d: any) => {
      this.user = d;
    });
    this.getDoctors();
  }

  filterUpdated() {
    this.pageNum = 1;
    this.getPatients();
  }

  getDoctors(){
    this.doctorsService.list({
      query: {
        filterSearch: '',
        filterIsArchive: false
      },
      pagination: {
        perPage: 500,
        pageNum: 1
      }
    }).subscribe((resp: any) => {
      this.idWiseDoc = {};
      this.docList = resp.list;
      this.docList.forEach((doc: any) => {
        this.idWiseDoc[doc._id] = doc;
      });
    })
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
        who: 'doctor'
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

  pageChanged(pageNum: any) {
    this.pageNum = pageNum;
    this.getPatients();
  }

  reject(patient: any){
    this.patientsService.addAppointment({
      _id: patient._id,
      planId: patient.insurances._id,
      appointment: {
        doctorSeen: null,
        status: 'reject',
        icds: [],
        cpts: [],
        copay: null,
        copayDesc: null,
        dos: null,
      }
    }).subscribe(d => {
      this.ngOnInit();
    })
  }

  submitCodes(patient: any){
    if(!patient.doctorSeen){
      this.snackBarService.errorMessage('Doctor seen is mandatory');
      return;
    }
    if(!patient.icds){
      this.snackBarService.errorMessage('ICD Codes are mandatory');
      return;
    }
    if(!patient.dos){
      this.snackBarService.errorMessage('DOS is mandatory');
      return;
    }
    patient.dos = {
      day: patient.dos.getDate(),
      month: patient.dos.getMonth()+1,
      year: patient.dos.getFullYear(),
      dos: patient.dos
    }

    // if(!patient.copayDesc){
    //   this.snackBarService.errorMessage('Copay description are mandatory');
    //   return;
    // }
    this.patientsService.addAppointment({
      _id: patient._id,
      planId: patient.insurances._id,
      appointment: {
        doctorSeen: patient.doctorSeen,
        status: 'seen',
        icds: patient.icds && patient.icds.length ? patient.icds.split(/[, ]/) : [],
        cpts: patient.cpts && patient.cpts.length ? patient.cpts.split(/[, ]/) : [],
        copay: patient.copay,
        copayDesc: patient.copayDesc,
        dos: patient.dos,
      }
    }).subscribe(d => {
      this.ngOnInit();
    })
  }

  downloadSampleImport(){
    this.snackBarService.downloadFileWithUrl('sampleImportStoreOrderFormat.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/MassImportStoreOrderTemplate.xlsx');
  }

}
