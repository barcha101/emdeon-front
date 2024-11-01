import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { EraService } from '../../shared/services/era.service';
import { HelperService } from '../../shared/services/helper.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { AddEraComponent } from 'src/app/shared/components/popups/add-era/add-era.component';

@Component({
  selector: 'app-era-list',
  templateUrl: './era-list.component.html',
  styleUrls: ['./era-list.component.scss']
})
export class EraListComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private eraService: EraService,
    private helperService: HelperService
  ) { }

  public list: any = [];

  public thisUser: any = {};


  ngOnInit(): void {
    this.getFiles();
    this.thisUser = SessionStorageService.getGenericJSON('user');
  }

  addEra(){
    const dialogRef = this.dialog.open(AddEraComponent, {
      width: '400px',
      height: '90vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
       this.ngOnInit();
      }
    });
  }

  getFiles() {
    this.eraService.list({
      query: {
      },
      pagination: {
        perPage: null,
        pageNum: null
      }
    }).subscribe((d: any) => {
      this.list = d['list'];
    });
  }

 

  getS3File(fileKey: any, fileName: any){
    this.helperService.getS3File(fileKey).subscribe(d=> {
      this.helperService.downloadBlobFile(d, fileName);
    });
  }

}