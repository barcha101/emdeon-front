import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { SnackBarService } from './shared/services/snack-bar.service';

@Component({
  selector: 'emdeon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public router: Router,
    private snackBarService: SnackBarService
  ){}

  public showSidebar = false;
  public closeAnn1 = false;
  public closeAnn2 = false;

  ngOnInit(): void {
    // this.snackBarService.successMessage('this is successs');
    // setTimeout(() => {
    //   this.snackBarService.errorMessage('this is error');
    // }, 3000);
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
