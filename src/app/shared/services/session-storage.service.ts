import { Injectable } from '@angular/core';

declare var localStorage: any;

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public static saveGenericJSON(name: string, val: Object): void {
    if(name == 'user'){
      name = 'userInformation'
    }
    localStorage.setItem(name, JSON.stringify(val));
  }

  public static clear(): void{
    localStorage.clear();
  }

  public static getGenericJSON(name: string): any {
    if(name == 'user'){
      name = 'userInformation'
    }
    return JSON.parse(localStorage.getItem(name));
  }

  public static setValue(key: string, value: string): void{
    if(key == 'token'){
      key = 'verificationToken'
    }
    localStorage.setItem(key, value);
  }

  public static getValue(key: string): any{
    if(key == 'token'){
      key = 'verificationToken'
    }
    return localStorage.getItem(key);
  }
}
