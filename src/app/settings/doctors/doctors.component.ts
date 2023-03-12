import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UpdateDoctorComponent } from '../popups/update-doctor/update-doctor.component';
import { DoctorsService } from './../../shared/services/doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  public list: any = [];
  public totalCount = 0;
  public perPage = 10;
  public pageNum = 1;
  public filterSearch = '';

  constructor(
    private doctorsService:DoctorsService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
    ) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  filterUpdated(){
    this.pageNum = 1;
    this.getDoctors();
  }

  getDoctors(){
    this.doctorsService.list({
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
    this.getDoctors();
  }

  addDoctor(){
    const dialogRef = this.dialog.open(UpdateDoctorComponent, {
      width: '550px',
      data: {
       type: 'add'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getDoctors();
      }
    });
  }

  editDoctor(doc: any){
    const dialogRef = this.dialog.open(UpdateDoctorComponent, {
      width: '550px',
      data: {
       type: 'edit',
       doc: doc
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getDoctors();
      }
    });
  }
}
