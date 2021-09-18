import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { Observable } from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http'
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { CONFIGURATION } from '../app.constants';


const API_URL = CONFIGURATION.baseUrls.server;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'
  })
};
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  
  constructor(private http: HttpClient, private router:Router) { }

  login(entity: AppUser): Observable<AppUserAuth> {
    this.resetSecurityObject();
    return this.http.post<AppUserAuth>(API_URL + "login",
    "grant_type=password&username=" + entity.userName + "&password=" + entity.password ,httpOptions).pipe(
      tap(resp => {
        this.securityObject.isAuthenticated=true;
        this.securityObject.userName=entity.userName;
        Object.assign(this.securityObject,resp);
        localStorage.setItem(
          "access_token",this.securityObject.access_token); 
        localStorage.setItem(
            "username",entity.userName);
      })
    ); 
  }

  redirecttologin(): void {
      this.router.navigate(['login']);
  }

  logout(): void {
    this.resetSecurityObject();
  }
  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.access_token = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAccessCategories = false;
    this.securityObject.canAddCategories = false;

    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
  }
}
