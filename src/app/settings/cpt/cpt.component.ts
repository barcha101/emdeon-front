import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UpdateCptComponent } from '../popups/update-cpt/update-cpt.component';
import { CptService } from './../../shared/services/cpt.service';

@Component({
  selector: 'app-cpt',
  templateUrl: './cpt.component.html',
  styleUrls: ['./cpt.component.scss']
})
export class CptComponent implements OnInit {

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;
  public filterSearch = '';

  constructor(
    private cptService: CptService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
    ) { }

  ngOnInit(): void {
    this.getCpt();
  }

  filterUpdated(){
    this.pageNum = 1;
    this.getCpt();
  }

  getCpt(){
    this.cptService.list({
      query: {
        filterSearch: this.filterSearch,
        filterIsArchive: false
      },
      pagination: {
        perPage: this.perPage,
        pageNum: this.pageNum
      }
    }).subscribe((d: any) => {
      this.list = d.list;
      this.totalCount = d.count;
    });
  }

  pageChanged(pageNum: any){
    this.pageNum = pageNum;
    this.getCpt();
  }

  addCpt(){
    const dialogRef = this.dialog.open(UpdateCptComponent, {
      width: '550px',
      data: {
       type: 'add'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getCpt();
      }
    });
  }

  editCpt(cpt: any){
    const dialogRef = this.dialog.open(UpdateCptComponent, {
      width: '550px',
      data: {
       type: 'edit',
       cpt: cpt
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getCpt();
      }
    });
  }
}
