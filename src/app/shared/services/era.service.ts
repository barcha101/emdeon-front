import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EraService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/era';

  constructor(
    private HttpClientObj: HttpClient
  ) { }

  addEraFile(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/addEraFile', data);
  }

  list(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/list', data);
  }

}
