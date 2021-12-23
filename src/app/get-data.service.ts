import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {  

  auth_token = sessionStorage.getItem('userToken') 

  response: any
  constructor(private _HttpClient: HttpClient) {
  }

  getAnimalsOutbreaks(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    })
    return this._HttpClient.get('https://animals.a3rff.com/api/Animals/GetSemsterNewOutbreaks', { headers: headers });
  }

  getAnimalsDeath(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    })
    return this._HttpClient.get(`https://animals.a3rff.com/api/Animals/GetSemsterDeathChart`, { headers: headers });
  }

  // getParameters(city?:string, disease?:string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.auth_token}`
  //   })
  //   let conc:any = `city=${city}&disease=${disease}`
  //   return this._HttpClient.get(`https://animals.a3rff.com/api/Animals/GetSemsterDeathChart?${conc}`, { headers: headers });
  // }

  getAnimalsLocation(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    })
    return this._HttpClient.get(`https://animals.a3rff.com/api/Animals/GetAnimalsLocations`, { headers: headers });

  }
}
