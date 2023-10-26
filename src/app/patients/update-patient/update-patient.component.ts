import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from '../../shared/services/patients.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

@Component({
  selector: 'emdeon-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public patientsService: PatientsService
  ) { }

  public patient: any = {
    dob: {
      dob: '',
      month: '',
      day: '',
      year: ''
    },
    insurances: [{
      name: '',
      plans: [{}]
    }]
  };

  public patientId: any = false;
  public user: any = {};

  ngOnInit(): void {
    this.user = SessionStorageService.getGenericJSON('user');
    this.patientId = this.route.snapshot.paramMap.get('id');
    if(this.patientId){
      this.patientsService.getSingle(this.patientId).subscribe((d: any) => {
        this.patient = d;
      });
    }
  }

  dobUpdated(){
    this.patient.dob.month = this.patient.dob.dob.getMonth()+1;
    this.patient.dob.day = this.patient.dob.dob.getDate();
    this.patient.dob.year = this.patient.dob.dob.getFullYear();
  }

  addInsurance(){
    console.log('adding ins');
    this.patient.insurances.push({
      name: '',
      plans: [{}]
    })
  }

  submit(){
    let error = false;
    for(let i=0 ; i<this.patient.insurances.length ; i++){
      if(!this.patient.insurances[i].typee ){
        this.snackBarService.errorMessage('Type is required in insurance plan');
        error = true;
        return;
      }
      if(!this.patient.insurances[i].status ){
        this.snackBarService.errorMessage('Status is required in insurance plan');
        error = true;
        return;
      }
      if(!this.patient.insurances[i].insuranceName ){
        this.snackBarService.errorMessage('Insurance name is required in insurance plan');
        error = true;
        return;
      }
      if(!this.patient.insurances[i].insuraceId ){
        this.snackBarService.errorMessage('Insurance ID is required in insurance plan');
        error = true;
        return;
      }
      // if(this.patient.insurances[i].active == '' || this.patient.insurances[i].active == null || this.patient.insurances[i].active == undefined){
      //   this.snackBarService.errorMessage('Is Active is required in insurance plan');
      //   error = true;
      //   return;
      // }
    }
    if(!error){
      if(this.patientId){
        this.update();
      } else {
        this.add();
      }
    }
  }

  update(){
    this.patientsService.update(this.patient).subscribe((d: any) => {
      this.router.navigate(['/app/']);
    });
  }

  statusUpdated(insurance: any){
    if(!insurance.statusHistory){
      insurance.statusHistory = [];
    }
    insurance.statusHistory.push({
      newStatus: insurance.status,
      updatedOn: new Date(),
      updatedBy: this.user._id
    });
    console.log(insurance);

  }

  add(){
    this.patientsService.add(this.patient).subscribe((d: any) => {
      // this.router.navigate(['/app/view/'+d._id]);
      this.router.navigate(['/app/']);
    });
  }

}
