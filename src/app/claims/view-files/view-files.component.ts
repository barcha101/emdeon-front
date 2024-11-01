import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ClaimsService } from '../../shared/services/claims.service';
import { HelperService } from '../../shared/services/helper.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';


@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private claimsService: ClaimsService,
    private helperService: HelperService
  ) { }

  public list: any = [];
  public noPatientFound = false;

  public thisUser: any = {};


  ngOnInit(): void {
    this.getFiles();
    this.thisUser = SessionStorageService.getGenericJSON('user');
  }

  stillProcessingClicked(){
    this.snackBarService.errorMessage('File can be exported once it is processed')
  }

  getFiles() {
    this.claimsService.getMyFiles({
      query: {
      },
      pagination: {
        perPage: null,
        pageNum: null
      }
    }).subscribe((d: any) => {
      this.list = d['files'];
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

  // exportPatients(sourceFileId: any, sourceFileName: any){
  //   this.patientsService.export({
  //     query: {
  //       filterSearch: '',
  //       filterIsArchive: null,
  //       filterDays: null,
  //       filterPlanStatus: null,
  //       selectedSourceFile: sourceFileId
  //     }
  //   }).subscribe((d: any) => {
  //     this.snackBarService.downloadFileWithUrl(sourceFileName+'-Findings.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/' + d['fileUrl']);
  //   });
  // }

  downloadSampleImport(){
    this.snackBarService.downloadFileWithUrl('Bulk-Import-Sample-Format.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/Bulk-Import-Sample-Format.xlsx');
  }

  getS3File(fileKey: any, fileName: any){
    this.helperService.getS3File(fileKey).subscribe(d=> {
      this.helperService.downloadBlobFile(d, fileName);
    });
  }

}