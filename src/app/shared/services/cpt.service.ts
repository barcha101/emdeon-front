import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CptService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/cpt';

  constructor(
    private HttpClientObj: HttpClient
  ) { }


  list(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/list', data);
  }

  getSingle(_id: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getSingle', {_id});
  }

  update(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/update', data);
  }

  add(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/add', data);
  }
}
