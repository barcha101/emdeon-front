import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../shared/services/users.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

@Component({
  selector: 'app-login',
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

  ngOnInit(): void {
  }

  submit(){
    if(this.view == 'login'){
      this.usersService.sendLoginCode(this.email, this.password).subscribe((d: any) => {
        this.view = 'code';
      });
    } else if(this.view == 'code'){
      this.usersService.loginWithCode(this.email, this.password, this.code).subscribe((d: any) => {
        SessionStorageService.setValue('token', d.token);
        SessionStorageService.saveGenericJSON('user', d.user);
        if(d.user.role == 'Doctor'){
          this.router.navigate(['/patients/visits']); 
        } else if(d.user.role == 'Finance') {
          this.router.navigate(['/patients/finance']); 
        } else {
          this.router.navigate(['/patients/list']); 
        }
      });
    } else {
      alert('Feature unavailable');
    }
  }

}
