import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  successMessage(msg: string){
    // this.snackBar.open(msg, '', {
    //   duration: 5000,
    //   panelClass: ['success-snackbar'],
    // });
  }

  errorMessage(msg: string){
    this.snackBar.open(msg, '', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  downloadFileWithUrl(fileName: any, MIME_TYPE: any, url: any): void{
      if (window.cordova) {
          window.open(url,'_system');
      } else {
          const dlLink = document.createElement('a');
          dlLink.download = fileName;
          dlLink.href = url;
          dlLink.dataset['downloadurl'] = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
      }
  }
}
