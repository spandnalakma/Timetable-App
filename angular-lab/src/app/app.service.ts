import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError,tap,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = "http://localhost:3000";
  
  httpsOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  };
  
  constructor(private http: HttpClient) { }

  test():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/api/secure");
  }

  searchCourses(subject:string,course:string):Observable<any>{
    let searchUrl = `/api/open/courses/${subject}/${course}`;
    return this.http.get<any>(this.baseUrl+searchUrl);
  }
}
