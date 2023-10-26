import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'emdeon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;
  public filterSearch = '';
  public filterRole = '';
  public filterIsArchive = false;
  public roles = ['Admin', 'User'];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  perPageUpdated(perPage: any){
    this.perPage = parseInt(perPage);
    this.filterUpdated();
  }

  filterUpdated(){
    this.pageNum = 1;
    this.getUsers();
  }

  getUsers(){
    this.usersService.list({
      query: {
        filterSearch: this.filterSearch,
        role: this.filterRole,
        filterIsArchive: this.filterIsArchive
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
    this.getUsers();
  }

}
