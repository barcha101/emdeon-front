import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/reports';

  constructor(
    private HttpClientObj: HttpClient
  ) { }

  exportReport(claimId: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/exportReport', {claimId});
  }

}
