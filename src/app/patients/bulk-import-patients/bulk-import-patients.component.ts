import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsService } from './../../shared/services/patients.service';

declare var $: any;
declare var readXlsxFile: any;
declare var readSheetNames: any;

@Component({
  selector: 'app-bulk-import-patients',
  templateUrl: './bulk-import-patients.component.html',
  styleUrls: ['./bulk-import-patients.component.scss']
})
export class BulkImportPatientsComponent implements OnInit {

  constructor(
    public patientsService: PatientsService,
    private router: Router
  ) { }

  public errors: any = [];
  public data: any = [];
  public errCount = 0;
  public isDone = false;
  public sheetNames: any = [];

  public sortKey = 'fName';
  public sortDir = false;


  ngOnInit(): void {
  }

  onFileChange(event: any): void{
    this.getBase64FromFile(event.target.files[0]).then((respp: any) => {
      this.patientsService.bulkUpload({file: respp.base}).subscribe((d: any) => {
        this.data = d.data;
        this.isDone = true;
        this.errCount = d.errCount;
        this.sheetNames = Object.keys(this.data);
        $('#sheet-file-ori').val(null);
      })
    }).catch(err => {
      console.log(err);
      $('#sheet-file-ori').val(null);
    });
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

  addVerifiedBulkImport(){
    this.patientsService.addVerifiedBulkImport(this.data).subscribe((d: any) => {
      this.router.navigate(['/patients/list']); 
    });
  }

}
