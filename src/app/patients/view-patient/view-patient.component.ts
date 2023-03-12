import { Component, OnInit } from '@angular/core';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from './../../shared/services/patients.service';
import { HelperService } from './../../shared/services/helper.service';

declare var $: any;

@Component({
  selector: 'app-view-patient',
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
    private helperService: HelperService

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

  public uploadingFile = false;
  public fileTypeModel: any = '';

  public patientId: any = false;

  public files: any = [];
  public filesToBeUploaded: any = [];

  public docList: any = [];
  public idWiseDoc: any = {};

  public attachBtnText: any = 'Attach File';

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if(this.patientId){
      this.getFiles();
      this.patientsService.getSingle(this.patientId).subscribe((d: any) => {
        this.patient = d;
      });
    }
  }

  dateUpdated(){
    this.patient.dob.month = this.patient.dob.dob.getMonth()+1;
    this.patient.dob.day = this.patient.dob.dob.getDate();
    this.patient.dob.year = this.patient.dob.dob.getFullYear();
  }

  addPlan(){
    this.patient.insurances.push({
      year: '',
      name: '',
      groupNumber: '',
      effectiveDate: '',
      terminationDate: '',
      deductable: '',
      coinsurance: '',
      copay: '',
      status: ''
    })
  }

  submit(){
    let error = false;
    for(let i=0 ; i<this.patient.insurances.length ; i++){
      if(!this.patient.insurances[i].year ){
        this.snackBarService.errorMessage('Year is required in insurance plan');
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
      if(this.patient.insurances[i].active == '' || this.patient.insurances[i].active == null || this.patient.insurances[i].active == undefined){
        this.snackBarService.errorMessage('Is Active is required in insurance plan');
        error = true;
        return;
      }
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
      //ignore
    });
  }

  add(){
    this.patientsService.add(this.patient).subscribe((d: any) => {
      //ignore
    });
  }

  onFileChange(event: any): void{
    this.attachBtnText = 'Loading ...';
    const reader: any = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const promiseArr = [];
      for(let i=0 ; i<event.target.files.length ; i++){
        promiseArr.push(this.getBase64FromFile(event.target.files[i]));
      }
      Promise.all(promiseArr).then((respp: any) => {
        this.filesToBeUploaded = respp;
        this.attachBtnText = respp[0].name;
        $('#upload-pdf').prop('value', '');
      }).catch(err => {
        console.log(err);
      });
    }
  }

  getBase64FromFile(file: any){
    return new Promise((ok, notOk) => {
      const readerr: any = new FileReader();
      readerr.readAsDataURL(file);
      readerr.onload = () => {
        ok({base: readerr.result.split(',')[1], name: file.name, fullBase: readerr.result}); 
      };
    });
  }

  bufferToBase64(buffer: any) {
      var bytes = new Uint8Array(buffer);
      var len = buffer.byteLength;
      var binary = "";
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
  };

  uploadFiles(){
    if(!this.fileTypeModel){
      this.snackBarService.errorMessage('File Type is required');
      return;
    }
    if(!(this.filesToBeUploaded && this.filesToBeUploaded.length)){
      this.snackBarService.errorMessage('No file attached');
      return;
    }
    this.attachBtnText = 'Attach File';
    this.filesToBeUploaded[0]['type'] = this.fileTypeModel;
    this.patientsService.uploadFiles(this.patientId, this.filesToBeUploaded).subscribe((d => {
      this.ngOnInit();
      
    }));
  }

  getFiles(){
    this.patientsService.getFiles(this.patientId).subscribe((d: any) => {
      this.files = d.files;
    });
  }

  getS3File(fileKey: any, fileName: any){
    this.helperService
    this.helperService.getS3File(fileKey).subscribe(d=> {
      this.helperService.downloadBlobFile(d, fileName);
    });
  }

}
