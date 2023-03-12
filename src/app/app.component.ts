import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public router: Router
  ){}

  public showSidebar = false;

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {       
      if(event instanceof NavigationEnd){
        let currentUrl = event.url; 
        if(currentUrl == '/' || currentUrl.indexOf('/login') >= 0){
          this.showSidebar = false;
        } else {
          this.showSidebar = true;
        }
      }   
    })  
  }
}
