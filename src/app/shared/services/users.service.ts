import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrlPrefix = environment.apiUrlPrefix + '/users';

  constructor(
    private HttpClientObj: HttpClient,
    private snackBarService: SnackBarService
  ) { }

  add(user: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/add', user);
  }

  editUserDetails(user: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/editUserDetails', user);
  }

  login(email: any, password: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/login', { email, password });
  }

  loginWithCode(email: any, password: any, code: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/loginWithCode', { email, password, code });
  }

  sendLoginCode(email: any, password: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/sendLoginCode', { email, password });
  }

  signup(email: any, password: any, cellNum: any, name: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/signup', { email, password, cellNum, name });
  }

  list(data: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/list', data);
  }

  getUserDetails(_id: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/getUserDetails', { _id });
  }

  removeUser(userId: any, archive: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/removeUser', { userId, archive });
  }

  changePassword(userId: any, password: any, confirmPassword: any) {
    return this.HttpClientObj.post(this.apiUrlPrefix + '/changePassword', { userId, password, confirmPassword });
  }
}
