import { Component, OnInit } from '@angular/core';
import { ClaimsService } from './../../shared/services/claims.service';

@Component({
  selector: 'app-view-files-detailed',
  templateUrl: './view-files-detailed.component.html',
  styleUrls: ['./view-files-detailed.component.scss']
})
export class ViewFilesDetailedComponent implements OnInit {

  constructor(
    private claimsService: ClaimsService
  ) { }

  public clients: any = [];
  public filterClient: any = '';
  public filterInsurance: any = null;
  public filterGroupBy: any = 'CPTs';
  public groupByOpts: any = ['CPTs', 'DOS', 'Files', 'Date of Submission', 'Status', 'Insurance', 'Claim Status', 'Claim Check Status'];

  public results: any = [];

  ngOnInit(): void {
    this.getClients();
    this.getResults();
  }

  getClients(){
    this.claimsService.getClients({}).subscribe((data: any) => {
      this.clients = data['clients'];
    })
  }

  getResults(){
    this.claimsService.claimCounts({client: this.filterClient, insurance: this.filterInsurance, groupBy: this.filterGroupBy}).subscribe((data: any) => {
      this.results = data;
    })
  }

  filterUpdated(){
    this.getResults();
  }

}
