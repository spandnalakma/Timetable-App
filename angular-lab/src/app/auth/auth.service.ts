import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import * as moment from "moment";
import { catchError,tap,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:3000";
  
  httpsOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      alert(error.error.errorMessage);
      return of(result as T);
    };
  }

  login(details) : Observable<any> {
    let loginUrl = "/api/login";
    return this.http.post<any>(loginUrl, JSON.stringify(details),this.httpsOptions).pipe(
      catchError(this.handleError<any>('login',[]))
    )
  }

  signup(details) : Observable<any> {
    let signupUrl = "/api/signup";
    return this.http.post<any>(signupUrl, JSON.stringify(details),this.httpsOptions).pipe(
      catchError(this.handleError<any>('signup',[]))
    )
  }

  goggleLogin(name): Observable<any>{
    let url = `/api/google/${name}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('goggleLogin',[]))
    )
  }

  setSession(authResult): void{
    const expiresAt = moment().add(authResult.responseObject.expiresIn,'second');
    localStorage.setItem('id_token',authResult.responseObject.token);
    localStorage.setItem("expires_at",JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("currentUser",authResult.responseObject.userName);
    localStorage.setItem("isAdmin",authResult.responseObject.isAdmin);
  }

  logout(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAdmin");
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
 getUserName():String{
   return localStorage.getItem('currentUser');
 }

 checkIfAdminUser(){
   if(localStorage.getItem('isAdmin')=="true"){
     return true;
   }
   else{
     return false;
   }
 }

}
