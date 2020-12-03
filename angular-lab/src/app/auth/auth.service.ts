import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:3000";
  
  httpsOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }

  login(details) : Observable<any> {
    let loginUrl = "/api/login";
    return this.http.post<any>(this.baseUrl+loginUrl, JSON.stringify(details),this.httpsOptions)
  }

  signup(details) : Observable<any> {
    let signupUrl = "/api/signup";
    return this.http.post<any>(this.baseUrl+signupUrl, JSON.stringify(details),this.httpsOptions)
  }

  setSession(authResult): void{
    const expiresAt = moment().add(authResult.responseObject.expiresIn,'second');
    localStorage.setItem('id_token',authResult.responseObject.token);
    localStorage.setItem("expires_at",JSON.stringify(expiresAt.valueOf()));
  }

  logout(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(){
    return !this.isLoggedIn();
  }

  getExpiration(){
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  getToken():String {
    return localStorage.getItem('id_token');
 }

}
