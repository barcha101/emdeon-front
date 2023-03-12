import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  iconClass: string;
  title: string;
  text: string;
  acceptText: string;
  rejectText: string;
  acceptBtnClass: string;
}

@Component({
  selector: 'app-generic-confirmation',
  templateUrl: './generic-confirmation.component.html',
  styleUrls: ['./generic-confirmation.component.scss']
})

export class GenericConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenericConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
  }

  accept(){
    this.dialogRef.close(true);
  }

  reject(){
    this.dialogRef.close(false);
  }

}
