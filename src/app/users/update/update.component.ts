import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { GenericConfirmationComponent } from 'src/app/shared/components/popups/generic-confirmation/generic-confirmation.component';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'emdeon-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router,
    public usersService: UsersService,
    public snackBarService: SnackBarService,
  ) { }

  public roles = ['Admin', 'User'];

  public userId: any = '';

  public user: any = {
    name: '',
    email: '',
    role: '',
    cellNum: '',
    doctors: [],
    permissions: {}
  };

  public tempDoctor: any = '';

  public isLoading = false;

  public loggedInUser: any = {role: ''};

  public docList: any = [];
  public idWiseDoc: any = {};

  ngOnInit(): void {
    this.loggedInUser = SessionStorageService.getGenericJSON('user');
    this.userId = this.route.snapshot.paramMap.get('id');
    if(!this.userId && this.router.url != '/users/add'){
      this.userId = this.loggedInUser._id;
    }
    if(this.userId){
      this.usersService.getInfoToEdit(this.userId).subscribe((d: any) => {
        this.user = d;
        if(!this.user.permissions){
          this.user.permissions = {};
        }
      });
    }
  }


  submit(){
    if(this.userId){
      this.update();
    } else {
      this.addNew();
    }
  }

  update(){
    const dialogRef = this.dialog.open(GenericConfirmationComponent, {
      width: '400px',
      data: {
        iconClass: "fas fa-edit icon-primary icon-round-popup",
        title: "Update User",
        text: `Are you sure you want to update user <b>"${this.user.name}"</b>`,
        acceptText: "Yes, Update",
        acceptBtnClass: 'primary',
        rejectText: "No, Cancel"
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.isLoading = true;
        this.usersService.editUserDetails(this.user).subscribe((d: any) => {
          this.router.navigate(['/users/view', this.user._id]);
        }, err => {
          this.isLoading = false;
        });
      }
    });
  }

  addNew(){
    const dialogRef = this.dialog.open(GenericConfirmationComponent, {
      width: '400px',
      data: {
        iconClass: "fas fa-plus icon-primary icon-round-popup",
        title: "Add User",
        text: `Are you sure you want to create user <b>"${this.user.name}"</b>`,
        acceptText: "Yes, Create",
        acceptBtnClass: 'primary',
        rejectText: "No, Cancel"
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.isLoading = true;
        this.usersService.add(this.user).subscribe((d: any) => {
          this.router.navigate(['/users/list']);
        }, err => {
          this.isLoading = false;
        });
      }
    });
  }
}
