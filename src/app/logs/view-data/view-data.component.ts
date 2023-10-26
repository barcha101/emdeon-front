import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'emdeon-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {

  public strData: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.strData = JSON.stringify(this.data);
  }

  ngOnInit(): void {
  }

}
