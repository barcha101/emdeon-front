import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EraService } from '../../shared/services/era.service';
import { ClaimsService } from '../../shared/services/claims.service';
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
    private claimsService: ClaimsService,
    public dialog: MatDialog,
    private eraService: EraService,
    private helperService: HelperService
  ) { }

  public list: any = [];

  public thisUser: any = {};

  public totalCount = 0;
  public perPage = 20;
  public pageNum = 1;

  public filterSearch = '';
  public filterStatus = '';
  public filterClient = '';
  public filterInsurance = '';

  public statusOpts: any = ['Pending', 'Processing', 'Processed', 'Error'];
  public clientOpts: any = [];


  ngOnInit(): void {
    this.getFiles();
    this.thisUser = SessionStorageService.getGenericJSON('user');
    this.getClients();
  }

  getClients(){
    this.claimsService.getClients({}).subscribe((d: any) => {
      this.clientOpts = d['clients'];
    });
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
        filterSearch: this.filterSearch,
        filterStatus: this.filterStatus,
        filterClient: this.filterClient
      },
      pagination: {
        perPage: this.perPage,
        pageNum: this.pageNum
      }
    }).subscribe((d: any) => {
      this.list = d['list'];
      this.totalCount = d['count'];
    });
  }

  filterUpdated(){
    this.pageNum = 1;
    this.getFiles();
  }

  perPageUpdated(perPage: any){
    this.perPage = parseInt(perPage);
    this.getFiles();
  }

  pageChanged(pageNum: any){
    this.pageNum = pageNum;
    this.getFiles();
  }

 

  getS3File(fileKey: any, fileName: any){
    this.helperService.getS3File(fileKey).subscribe(d=> {
      this.helperService.downloadBlobFile(d, fileName);
    });
  }

}