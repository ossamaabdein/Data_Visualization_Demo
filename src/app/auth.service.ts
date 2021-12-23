import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(sessionStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
  }

  constructor(private _HttpClient: HttpClient, private _Router: Router) { 
    if(sessionStorage.getItem('userToken') != null) {
      this.saveUserData();
    }
  }


  login(formData: object): Observable<any> {
    return this._HttpClient.post('https://animals.a3rff.com/api/Account/Login', formData);
  }

  logout() {
    sessionStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['login']);
  }
}
