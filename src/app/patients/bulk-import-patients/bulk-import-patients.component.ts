import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PatientsService } from '../../shared/services/patients.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';

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
    private snackBarService: SnackBarService
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
    cptCodes: [{
      start: '',
      end: ''
    }]
  };

  public sortKey = 'fName';
  public sortDir = false;


  ngOnInit(): void {
  }

  exportBulkImportResults(){
    this.patientsService.exportBulkImportResults(this.data).subscribe((d: any) => {
      this.snackBarService.downloadFileWithUrl(this.file.name+' Results.xlsx', 'application/vnd.ms-excel', environment.apiUrlPrefix + '/' + d['fileUrl']);
    });
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
    if(!this.process.eligibility && !this.process.sns){
      return this.snackBarService.errorMessage('Choose atleast one processor');
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
