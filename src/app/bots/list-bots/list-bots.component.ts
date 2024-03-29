import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BotsService } from '../../shared/services/bots.service';
import { UpdateBotComponent } from '../update-bot/update-bot.component';

@Component({
  selector: 'emdeon-list-bots',
  templateUrl: './list-bots.component.html',
  styleUrls: ['./list-bots.component.scss']
})
export class ListBotsComponent implements OnInit {

  public list: any = [];
  public totalCount = 0;
  public perPage = 50;
  public pageNum = 1;
  public filterSearch = '';
  public filterIsArchive = false;

  constructor(
    private botsService: BotsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBots();
  }

  perPageUpdated(perPage: any){
    this.perPage = parseInt(perPage);
    this.filterUpdated();
  }

  filterUpdated(){
    this.pageNum = 1;
    this.getBots();
  }

  getBots(){
    this.botsService.list({
      query: {
        filterSearch: this.filterSearch,
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
    this.getBots();
  }

  addBot(){
    const dialogRef = this.dialog.open(UpdateBotComponent, {
      width: '400px',
      height: '90vh',
      data: {
        what: 'add'
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.pageChanged(1);
      }
    });
  }

  updateBot(bot: any){
    const dialogRef = this.dialog.open(UpdateBotComponent, {
      width: '400px',
      height: '90vh',
      data: {
        what: 'update',
        botInfo: bot
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.ngOnInit();
      }
    });
  }

}
