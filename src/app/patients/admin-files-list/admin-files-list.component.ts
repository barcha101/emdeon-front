import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from '../../shared/services/patients.service';
import { HelperService } from '../../shared/services/helper.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-files-list',
  templateUrl: './admin-files-list.component.html',
  styleUrls: ['./admin-files-list.component.scss']
})
export class AdminFilesListComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private patientsService: PatientsService,
    private helperService: HelperService,
    private router: Router
  ) { }

  public list: any = [];
  public noPatientFound = false;

  public currentView: any = '';
  public thisUser: any = {};


  ngOnInit(): void {
    this.getFiles();
    this.thisUser = SessionStorageService.getGenericJSON('user');
    if(this.thisUser.role != 'Admin'){
      this.router.navigate(['/app']); 
    }
    // if(this.thisUser.role == 'Admin' || ){
    //   this.currentView = 'table';
    // } else {
    //   this.currentView = 'grid';
    // }
    if(this.thisUser.email == 'dmetlpc5@gmail.com' || this.thisUser.email == 'uzair.grmc@gmail.com' || this.thisUser.email == 'aanyjee@gmail.com' || this.thisUser.email == 'lalani.azeem@gmail.com'){
      this.currentView = 'grid';
    } else {
      this.currentView = 'table';
    }
  }

  stillProcessingClicked(){
    this.snackBarService.errorMessage('File can be exported once it is processed')
  }

  getFiles() {
    this.patientsService.getMyFiles({
      query: {
      },
      pagination: {
        perPage: null,
        pageNum: null
      }
    }).subscribe((d: any) => {
      this.list = d;
      if(!this.list.length){
        this.noPatientFound = true;
      }
      for(let i=0 ; i<this.list.length ; i++){
        this.list[i]['whatis'] = [];
        if(this.list[i]?._id?.processors?.eligibility){
          this.list[i]['whatis'].push('Medicare Eligibility')
        }
        if(this.list[i]?._id?.processors?.sns){
          this.list[i]['whatis'].push('SNS')
        }
        if(this.list[i]?._id?.processors?.wellcareElig){
          this.list[i]['whatis'].push('Wellcare Eligibility')
        }
        if(this.list[i]?._id?.processors?.broadWellcareElig){
          this.list[i]['whatis'].push('Broader Wellcare')
        }
        if(this.list[i]?._id?.processors?.medicarePCP){
          this.list[i]['whatis'].push('Medicare Physician(s)')
        }
        if(this.list[i]?._id?.processors?.cigna){
          this.list[i]['whatis'].push('Cigna Eligibility')
        }
        if(this.list[i]?._id?.processors?.aetna){
          this.list[i]['whatis'].push('Aetna Eligibility')
        }
        if(this.list[i]?._id?.processors?.united){
          this.list[i]['whatis'].push('UHC Eligibility')
        }
        if(this.list[i]?._id?.processors?.humana){
          this.list[i]['whatis'].push('Humana Eligibility')
        }
      }
    });
  }

  exportPatients(sourceFileId: any, sourceFileName: any, generateOut: any = null){
    this.patientsService.export({
      query: {
        filterSearch: '',
        filterIsArchive: null,
        filterDays: null,
        filterPlanStatus: null,
        selectedSourceFile: sourceFileId,
        generateOut: generateOut
      }
    }).subscribe((d: any) => {
      this.snackBarService.downloadFileWithUrl(sourceFileName+'-Findings.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/' + d['fileUrl']);
    });
  }

  downloadSampleImport(){
    this.snackBarService.downloadFileWithUrl('Bulk-Import-Sample-Format.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/Bulk-Import-Sample-Format.xlsx');
  }

  getS3File(fileKey: any, fileName: any){
    this.helperService.getS3File(fileKey).subscribe(d=> {
      this.helperService.downloadBlobFile(d, fileName);
    });
  }

}