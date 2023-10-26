import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotsService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/bots';

  constructor(
    private HttpClientObj: HttpClient
  ) { }
  
  list(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/list', data);
  }

  add(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/add', data);
  }

  update(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/update', data);
  }

  listLogs(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/listLogs', data);
  }

  updateArchive(botId: any, isArchive: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/updateArchive', {botId, isArchive});
  }

  getSingle(_id: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getSingle', {_id});
  }

}
