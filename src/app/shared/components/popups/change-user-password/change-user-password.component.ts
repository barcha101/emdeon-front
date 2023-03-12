import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/shared/services/users.service';
import { SnackBarService } from '../../../services/snack-bar.service';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.scss']
})
export class ChangeUserPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangeUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService:UsersService,
    private snackBarService: SnackBarService
  ) {
    this.userId=data.userId;
  }
  public userId:any = ''
  public password: any = '';
  public confirmPassword: any = '';

  ngOnInit(): void {
  }

  changePass(){
    if(this.password == this.confirmPassword){
      this.usersService.changePassword(this.userId,this.password,this.confirmPassword).subscribe(user=>{
        this.dialogRef.close(true);
        this.snackBarService.successMessage("The password is updated successfully");

      })
    }
  }

  close(){
    this.dialogRef.close(false);
  }

}
