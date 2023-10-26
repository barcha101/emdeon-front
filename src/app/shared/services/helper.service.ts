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

  downloadBlobFile(response: any, filename: any){
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    if (filename)
        downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    // to download file uncommnent line below
    // downloadLink.click();

    //this line opens file new tab
    window.open(downloadLink, '_blank');
  }

}
