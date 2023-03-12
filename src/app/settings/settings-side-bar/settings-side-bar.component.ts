import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-settings-side-bar',
  templateUrl: './settings-side-bar.component.html',
  styleUrls: ['./settings-side-bar.component.scss']
})
export class SettingsSideBarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  public cUrl = '';

  ngOnInit(): void {
    this.cUrl = this.router.url;
    this.router.events.subscribe((event: any) => {       
      if(event instanceof NavigationEnd){
        this.cUrl = event.url; 
      }   
    })  
  }

}
