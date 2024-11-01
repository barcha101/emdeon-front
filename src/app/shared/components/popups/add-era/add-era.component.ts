import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClaimsService } from 'src/app/shared/services/claims.service';
import { EraService } from 'src/app/shared/services/era.service';
import { SnackBarService } from '../../../services/snack-bar.service';

declare var $: any;

@Component({
  selector: 'app-add-era',
  templateUrl: './add-era.component.html',
  styleUrls: ['./add-era.component.scss']
})
export class AddEraComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private claimsService: ClaimsService,
    private eraService: EraService,
    private snackBarService: SnackBarService
  ) {}
  public clients: any = '';
  public selectedClient: any = '';

  public files: any =[];

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.claimsService.getClients({}).subscribe((clients: any)=>{
      this.clients = clients['clients'];
    })
  }

  addEra(){
    if(!this.selectedClient){
      return this.snackBarService.errorMessage('Please select a client');
    }
    if(!this.files.length){
      return this.snackBarService.errorMessage('Please select a file');
    }
   this.eraService.addEraFile({files: this.files, client: this.selectedClient}).subscribe((respp: any) => {
    this.dialogRef.close(true);
    }, (err) => {
      this.dialogRef.close(false);
    });
  }

  onFileChange(event: any): void{
    for (let index = 0; index < event.target.files.length; index++) {
      this.getBase64FromFile(event.target.files[index]).then((respp: any) => {
        this.files.push(respp);
        $('#sheet-file-ori').val(null);
      }).catch(err => {
        console.log(err);
        $('#sheet-file-ori').val(null);
      });
    }
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

  close(){
    this.dialogRef.close(false);
  }

}
