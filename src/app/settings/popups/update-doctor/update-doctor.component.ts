import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorsService } from './../../../shared/services/doctors.service';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.scss']
})
export class UpdateDoctorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public doctorsService: DoctorsService
  ) {}

  public doctor: any = {};

  ngOnInit(): void {
    if(this.data.type == 'edit'){
      this.doctor = this.data.doc;
    }
  }

  accept(){
    if(this.data.type == 'add'){
      this.doctorsService.add(this.doctor).subscribe(d => {
        this.dialogRef.close(true);
      });
    } else {
      this.doctorsService.update(this.doctor).subscribe(d => {
        this.dialogRef.close(true);
      });
    }
  }

  reject(){
    this.dialogRef.close(false);
  }
}
