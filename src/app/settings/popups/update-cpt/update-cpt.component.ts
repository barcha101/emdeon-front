import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CptService } from './../../../shared/services/cpt.service';

@Component({
  selector: 'app-update-cpt',
  templateUrl: './update-cpt.component.html',
  styleUrls: ['./update-cpt.component.scss']
})
export class UpdateCptComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateCptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cptService: CptService
  ) {}

  public cpt: any = {};

  ngOnInit(): void {
    if(this.data.type == 'edit'){
      this.cpt = this.data.cpt;
    }
  }

  accept(){
    if(this.data.type == 'add'){
      this.cptService.add(this.cpt).subscribe(d => {
        this.dialogRef.close(true);
      });
    } else {
      this.cptService.update(this.cpt).subscribe(d => {
        this.dialogRef.close(true);
      });
    }
  }

  reject(){
    this.dialogRef.close(false);
  }
}
