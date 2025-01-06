import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/helper';

  constructor(
    private HttpClientObj: HttpClient
  ) { }

  getS3File(url: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getS3File', {url},{responseType: 'blob' as 'json'});
  }

  // downloadBlobFile(response: any, filename: any){
  //   let dataType = response.type;
  //   let binaryData = [];
  //   binaryData.push(response);
  //   let downloadLink = document.createElement('a');
  //   downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  //   if (filename)
  //       downloadLink.setAttribute('download', filename);
  //   document.body.appendChild(downloadLink);
  //   // to download file uncommnent line below
  //   // downloadLink.click();

  //   //this line opens file new tab
  //   window.open(downloadLink, '_blank');
  // }

  downloadBlobFile(response: any, filename: any) {
    if (!response || !(response instanceof Blob)) {
      console.error('Invalid Blob response');
      return;
    }
  
    const dataType = response.type;
    const binaryData = [response];
    const objectURL = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
  
    const downloadLink = document.createElement('a');
    downloadLink.href = objectURL;
  
    // Set the filename for download
    if (filename) {
      downloadLink.setAttribute('download', filename);
    } else {
      downloadLink.setAttribute('download', 'downloaded_file');
    }
  
    document.body.appendChild(downloadLink);
  
    // Trigger download with the correct filename
    downloadLink.click();
  
    // Cleanup
    setTimeout(() => {
      window.URL.revokeObjectURL(objectURL);
      document.body.removeChild(downloadLink);
    }, 100);
  }

}
