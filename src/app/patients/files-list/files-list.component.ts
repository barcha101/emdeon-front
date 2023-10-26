import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from '../../shared/services/patients.service';
import { HelperService } from '../../shared/services/helper.service';


@Component({
  selector: 'emdeon-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private patientsService: PatientsService,
    private helperService: HelperService
  ) { }

  public list: any = [];
  public noPatientFound = false;


  ngOnInit(): void {
    this.getFiles();
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
    });
  }

  exportPatients(sourceFileId: any, sourceFileName: any){
    this.patientsService.export({
      query: {
        filterSearch: '',
        filterIsArchive: null,
        filterDays: null,
        filterPlanStatus: null,
        selectedSourceFile: sourceFileId
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