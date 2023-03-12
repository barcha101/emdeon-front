import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './../../shared/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { GenericConfirmationComponent } from 'src/app/shared/components/popups/generic-confirmation/generic-confirmation.component';
import { ChangeUserPasswordComponent } from 'src/app/shared/components/popups/change-user-password/change-user-password.component';
import { DoctorsService } from 'src/app/shared/services/doctors.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private usersService: UsersService,
    public router: Router,
    private snackBarService: SnackBarService,
    private doctorsService: DoctorsService

  ) { }
  
  public user: any = {};
  public userId:any = "";

  public loggedInUser: any = {role: ''};

  public docList: any = [];
  public idWiseDoc: any = {};

  ngOnInit(): void {
    this.loggedInUser = SessionStorageService.getGenericJSON('user');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.userId = this.route.snapshot.paramMap.get('id');
    if(!this.userId){
      this.userId = this.loggedInUser._id;
    }
    this.getUser();
    this.getDoctors();
  }

  getUser(){
    this.usersService.getUserDetails(this.userId).subscribe((d: any) => {
      this.user = d;
    });
  }

  getDoctors(){
    this.doctorsService.list({
      query: {
        filterSearch: '',
        filterIsArchive: false
      },
      pagination: {
        perPage: 500,
        pageNum: 1
      }
    }).subscribe((resp: any) => {
      this.idWiseDoc = {};
      this.docList = resp.list;
      this.docList.forEach((doc: any) => {
        this.idWiseDoc[doc._id] = doc;
      });
    })
  }

  archive(){
    const dialogRef = this.dialog.open(GenericConfirmationComponent, {
      width: '400px',
      data: {
        iconClass: "fas fa-trash-alt icon-danger icon-round-popup",
        title: "Archive User",
        text: `Are you sure you want to archive user <b>"${this.user.name}"</b>`,
        acceptText: "Yes, Archive",
        acceptBtnClass: 'danger',
        rejectText: "No, Cancel"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.usersService.removeUser(this.userId, true).subscribe((d: any) => {
          this.snackBarService.successMessage("The user is archived");
          this.getUser()
        });
      }
    });
  }

  unarchive(){
    const dialogRef = this.dialog.open(GenericConfirmationComponent, {
      width: '400px',
      data: {
        iconClass: "fas fa-trash-alt icon-danger icon-round-popup",
        title: "Unarchive User",
        text: `Are you sure you want to unarchive user <b>"${this.user.name}"</b>`,
        acceptText: "Yes, Unarchive",
        acceptBtnClass: 'danger',
        rejectText: "No, Cancel"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.usersService.removeUser(this.userId, false).subscribe((d: any) => {
          this.snackBarService.successMessage("The user is unarchived");
          this.getUser()
        });
      }
    });
  }

  changePassword(){
    const dialogRef = this.dialog.open(ChangeUserPasswordComponent, {
      width: '500px',
      data: {
        userId: this.user._id
      },
    });
  }

}
