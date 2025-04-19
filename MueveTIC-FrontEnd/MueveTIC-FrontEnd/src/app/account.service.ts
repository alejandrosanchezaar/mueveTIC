import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { apiBaseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private httpClient : HttpClient,private router: Router) {
  }

  register(info: any): Observable<any> {
    return this.httpClient.post(`${apiBaseUrl}/person/register`, info);
  }

  verifyCode(info: any): Observable<any> {
    return this.httpClient.post(`${apiBaseUrl}/person/verifyCode`, info);
  }

  login(info: any): Observable<any> {
    return this.httpClient.put(`${apiBaseUrl}/person/login`, info);
  }

    forgotpwd(info: any) : Observable<any>{
      return this.httpClient.post(`${apiBaseUrl}/person/resetEmail`,info)
    }
    resetpwd(info:any): Observable<any>{
      return this.httpClient.post(`${apiBaseUrl}/users/resetPassword`,info)
    }

}
