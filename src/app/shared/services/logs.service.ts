import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/logs';

  constructor(
    private HttpClientObj: HttpClient
  ) { }


  list(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/list', data);
  }
}
