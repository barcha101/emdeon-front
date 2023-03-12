import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public router: Router,
    public sessionStorageService: SessionStorageService,
    private usersService: UsersService
  ) { }

  public cUrl = '';
  public user:any = {};
  public userFromApi: any = {};
  ngOnInit(): void {
    this.cUrl = this.router.url;
    this.router.events.subscribe((event: any) => {       
      if(event instanceof NavigationEnd){
        this.cUrl = event.url; 
      }   
    });
    this.user= SessionStorageService.getGenericJSON("user");
    this.usersService.getUserDetails(this.user._id).subscribe(user => {
      this.userFromApi = user;
    })
  }

}
