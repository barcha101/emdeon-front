import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClaimsService } from '../../shared/services/claims.service';
import { HelperService } from '../../shared/services/helper.service';
import { BotsService } from 'src/app/shared/services/bots.service';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-view-ind-patient',
  templateUrl: './view-ind-patient.component.html',
  styleUrls: ['./view-ind-patient.component.scss']
})
export class ViewIndPatientComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public claimsService: ClaimsService,
    private helperService: HelperService,
    private botsService: BotsService,
    private reportsService: ReportsService
    ) { }

  public patient: any = {
    dob: {
      dob: '',
      month: '',
      day: '',
      year: ''
    }
  };


 
  public patientId: any = false;

  public logsList: any = [];

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if(this.patientId){
      this.getLogs();
      this.claimsService.getSingle(this.patientId).subscribe((d: any) => {
        this.patient = d;
      });
    }
  }

  getLogs(){
    this.botsService.listLogs({
      query: {
        patientId: this.patientId,
      },
      pagination: {
        perPage: 500,
        pageNum: 1
      }
    }).subscribe((d: any) => {
      this.logsList = d.list;
    });
  }

  exportReport(){
    if(!this.patient.reportS3Link){
      this.snackBarService.errorMessage('Report not generated for this patient yet');
      return;
    } else {
      this.helperService.getS3File(this.patient.reportS3Link).subscribe(d=> {
        this.helperService.downloadBlobFile(d, this.patient.fName+' '+this.patient.lName+'.pdf');
      });
    }
  }
  
  getS3File(fileKey: any, fileName: any){
    this.helperService.getS3File(fileKey).subscribe(d=> {
      this.helperService.downloadBlobFile(d, fileName);
    });
  }

}
