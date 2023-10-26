import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDataComponent } from '../view-data/view-data.component';
import { LogsService } from '../../shared/services/logs.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'emdeon-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;

  public typeOpts = ['Add Patient', 'Update Patient'];
  public userOpts: any = [];
  public filterUser = '';
  public filterType = '';

  public sortKey = 'createdAt';
  public sortDir = false;

  constructor(
    private logsService: LogsService,
    public dialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getLogs();
    this.getUsers();
  }

  filterUpdated(){
    this.pageNum = 1;
    this.getLogs();
  }

  getUsers(){
    this.usersService.list({
      query: {},
      pagination: {
        perPage: 500,
        pageNum: 1
      }
    }).subscribe((d: any) => {
      this.userOpts = d.list;
    });
  }

  perPageUpdated(perPage: any){
    this.perPage = parseInt(perPage);
    this.filterUpdated();
  }

  getLogs(){
    let sort: any = {};
    sort[this.sortKey] = this.sortDir ? 1 : -1;
    this.logsService.list({
      query: {
        user: this.filterUser,
        type: this.filterType
      },
      sort,
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
    this.getLogs();
  }

  viewData(data: any){
    const dialogRef = this.dialog.open(ViewDataComponent, {
      width: '70%',
      data: data,
    });
  }

}
