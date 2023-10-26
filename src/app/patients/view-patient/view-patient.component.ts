import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from '../../shared/services/patients.service';
import { HelperService } from '../../shared/services/helper.service';
import { BotsService } from 'src/app/shared/services/bots.service';

declare var $: any;

@Component({
  selector: 'emdeon-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public patientsService: PatientsService,
    private helperService: HelperService,
    private botsService: BotsService

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
      this.patientsService.getSingle(this.patientId).subscribe((d: any) => {
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
  
  getS3File(fileKey: any, fileName: any){
    this.helperService.getS3File(fileKey).subscribe(d=> {
      this.helperService.downloadBlobFile(d, fileName);
    });
  }

}
