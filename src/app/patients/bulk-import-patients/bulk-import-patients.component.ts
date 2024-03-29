import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PatientsService } from '../../shared/services/patients.service';
import { UsersService } from '../../shared/services/users.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

declare var $: any;
declare var readXlsxFile: any;
declare var readSheetNames: any;

@Component({
  selector: 'emdeon-bulk-import-patients',
  templateUrl: './bulk-import-patients.component.html',
  styleUrls: ['./bulk-import-patients.component.scss']
})
export class BulkImportPatientsComponent implements OnInit {

  constructor(
    public patientsService: PatientsService,
    private router: Router,
    private snackBarService: SnackBarService,
    private usersService: UsersService
  ) { }

  public errors: any = [];
  public data: any = [];
  public errCount = 0;
  public isDone = false;
  public sheetNames: any = [];

  public file: any ={};

  public process: any = {
    eligibility: false,
    sns: false,
    wellcareElig: false,
    broadWellcareElig: false,
    united: false,
    aetna: false,
    cigna: false,
    humana: false,
    medicarePCP: false,
    cptCodes: [{
      start: '',
      end: ''
    }]
  };

  public radioModel: any = '';

  public sortKey = 'fName';
  public sortDir = false;

  public userFromApi: any = {};


  ngOnInit(): void {
    const userr = SessionStorageService.getGenericJSON('user');
    this.usersService.getMyInfo(userr._id).subscribe(data => {
      this.userFromApi = data;
      console.log(data);
    });
  }

  exportBulkImportResults(){
    this.patientsService.exportBulkImportResults(this.data).subscribe((d: any) => {
      this.snackBarService.downloadFileWithUrl(this.file.name+' Results.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/' + d['fileUrl']);
    });
  }

  downloadSampleImport(){
    this.snackBarService.downloadFileWithUrl('Medicare-Format.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/Medicare-Format.xlsx');
  }

  downloadWellcareSample(){
    this.snackBarService.downloadFileWithUrl('Wellcare-Format.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/Wellcare-Format.xlsx');
  }

  downloadBroaderWellcareSample(){
    this.snackBarService.downloadFileWithUrl('Broader-Wellcare-Format.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/Broader-Wellcare-Format.xlsx');
  }

  downloadGeneralSampleImport(){
    this.snackBarService.downloadFileWithUrl('Broader-Wellcare-Format.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/public/General-Format.xlsx');
  }

  onFileChange(event: any): void{
    this.getBase64FromFile(event.target.files[0]).then((respp: any) => {
      this.file = respp;
    }).catch(err => {
      console.log(err);
      $('#sheet-file-ori').val(null);
    });
  }

  submitFile(){
    if(!this.radioModel){
      return this.snackBarService.errorMessage('Choose atleast one processor');
    } else {
      this.process.eligibility = false;
      this.process.wellcareElig = false;
      this.process.broadWellcareElig = false;
      this.process.medicarePCP = false;
      if(this.radioModel == 'medicare'){
        this.process.eligibility = true;
      } else if(this.radioModel == 'wellcare'){
        this.process.wellcareElig = true;
      } else if(this.radioModel == 'broaderWellcare'){
        this.process.broadWellcareElig = true;
      } else if(this.radioModel == 'medicarePCP'){
        this.process.medicarePCP = true;
      } else if(this.radioModel == 'united'){
        this.process.united = true;
      } else if(this.radioModel == 'aetna'){
        this.process.aetna = true;
      } else if(this.radioModel == 'cigna'){
        this.process.cigna = true;
      } else if(this.radioModel == 'humana'){
        this.process.humana = true;
      } else {
        return this.snackBarService.errorMessage('Invalid processor selected');
      }
    }
    if(!this.file || !this.file.name){
      return this.snackBarService.errorMessage('Upload a file');
    }
    if(this.process.sns){
      for(const item of this.process.cptCodes){
        if(!item.start || !item.end){
          return this.snackBarService.errorMessage('CPT range is required for SNS processor');
        }
      }
    }
    this.patientsService.bulkUpload({
      file: this.file,
      process: this.process
    }).subscribe((d: any) => {
        this.data = d.data;
        this.isDone = true;
        this.errCount = d.errCount;
        this.sheetNames = Object.keys(this.data);
        $('#sheet-file-ori').val(null);
    })
  }

  getBase64FromFile(file: any){
    return new Promise((ok, notOk) => {
      const readerr: any = new FileReader();
      readerr.readAsDataURL(file);
      readerr.onload = () => {
        ok({base: readerr.result.split(',')[1], name: file.name}); 
      };
    });
  }

  addVerifiedBulkImport(){
    this.patientsService.addVerifiedBulkImport(this.data).subscribe((d: any) => {
      this.router.navigate(['/app']); 
    });
  }

}
