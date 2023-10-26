import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GenericConfirmationComponent } from 'src/app/shared/components/popups/generic-confirmation/generic-confirmation.component';
import { BotsService } from '../../shared/services/bots.service';
import { UpdateBotComponent } from '../update-bot/update-bot.component';

@Component({
  selector: 'emdeon-view-bot',
  templateUrl: './view-bot.component.html',
  styleUrls: ['./view-bot.component.scss']
})
export class ViewBotComponent implements OnInit {

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;

  public botId: any = '';
  public botInfo: any = {};

  constructor(
    private botsService: BotsService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.botId = this.route.snapshot.paramMap.get('id');
    this.getLogs();
    this.getBotDetails();
  }

  getBotDetails(){
    this.botsService.getSingle(this.botId).subscribe((d: any) => {
      this.botInfo = d;
    });
  }

  perPageUpdated(perPage: any){
    this.perPage = parseInt(perPage);
    this.filterUpdated();
  }

  filterUpdated(){
    this.pageNum = 1;
    this.getLogs();
  }

  getLogs(){
    this.botsService.listLogs({
      query: {
        botId: this.botId,
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
    this.getLogs();
  }

  archive(){
    const dialogRef = this.dialog.open(GenericConfirmationComponent, {
      width: '400px',
      data: {
        iconClass: "fas fa-trash-alt icon-danger icon-round-popup",
        title: "Archive Bot",
        text: `Are you sure you want to archive bot <b>"${this.botInfo.username}"</b>`,
        acceptText: "Yes, Archive",
        acceptBtnClass: 'danger',
        rejectText: "No, Cancel"
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.botsService.updateArchive(this.botId, true).subscribe(d => {
          this.ngOnInit();
        });
      }
    });
  }

  unarchive(){
    const dialogRef = this.dialog.open(GenericConfirmationComponent, {
      width: '400px',
      data: {
        iconClass: "fas fa-trash-alt icon-danger icon-round-popup",
        title: "Unarchive Bot",
        text: `Are you sure you want to unarchive bot <b>"${this.botInfo.username}"</b>`,
        acceptText: "Yes, Unarchive",
        acceptBtnClass: 'danger',
        rejectText: "No, Cancel"
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.botsService.updateArchive(this.botId, false).subscribe(d => {
          this.ngOnInit();
        });
      }
    });
  }

  updateBot(){
    const dialogRef = this.dialog.open(UpdateBotComponent, {
      width: '400px',
      data: {
        what: 'update',
        botInfo: this.botInfo
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.ngOnInit();
      }
    });
  }

}
