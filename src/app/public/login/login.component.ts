import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

@Component({
  selector: 'emdeon-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  email = '';
  password = '';
  view = 'login';
  codeMessage = '';
  public code = '';
  public message: any = '';

  ngOnInit(): void {
    const token = SessionStorageService.getValue('token');
    if(token){
      this.router.navigate(['/claims']); 
    }
  }

  submit(){
    if(this.view == 'login'){
      this.usersService.confirmUsernamePassword(this.email, this.password).subscribe((d: any) => {
        this.view = 'code';
        this.message = d.displayMessage;
      });
    } else if(this.view == 'code'){
      this.usersService.validateLoginCode(this.email, this.password, this.code).subscribe((d: any) => {
        SessionStorageService.setValue('token', d.authString);
        SessionStorageService.saveGenericJSON('user', d.userInfo);
        this.router.navigate(['/app']); 
      });
    } else {
      alert('Feature unavailable');
    }
  }

}
