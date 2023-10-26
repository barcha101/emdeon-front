import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from '../../shared/services/patients.service';

@Component({
  selector: 'emdeon-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private patientsService: PatientsService
  ) { }

  public days_list: any = [];
  public days_totalCount = 0;
  public perPage = 10;
  public days_pageNum = 1;
  public days_filterSearch = '';
  public filterDays: any = '';

  ngOnInit(): void {
    this.getDaysPatients();
  }

  days_filterUpdated() {
    this.days_pageNum = 1;
    this.getDaysPatients();
  }

  getDaysPatients() {
    this.patientsService.list({
      query: {
        filterSearch: this.days_filterSearch,
        filterIsArchive: false,
        filterDays: this.filterDays
      },
      pagination: {
        perPage: this.perPage,
        pageNum: this.days_pageNum
      }
    }).subscribe((d: any) => {
      this.days_list = d.list;
      this.days_totalCount = d.count;
    });
  }

  days_pageChanged(pageNum: any) {
    this.days_pageNum = pageNum;
    this.getDaysPatients();
  }
}
