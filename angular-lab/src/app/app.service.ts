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

  searchCourseswithKeywords(keyword:string):Observable<any>{
    let url = `/api/open/courses/${keyword}`;
    return this.http.get<any>(this.baseUrl+url);
  }

  getpublicCourseLists(username):Observable<any>{
    let url = `/api/open/schedules/${username}`;
    return this.http.get<any>(this.baseUrl+url);
  }

  getSubjectandCourseCodePairs():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/api/secure/courses");
  }

  createCourses(resObj):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/api/secure/schedules/create",resObj,this.httpsOptions);
  }

  getUserCourseLists(username):Observable<any>{
    let url = `/api/secure/usercourselists/${username}`
    return this.http.get<any>(this.baseUrl+url);
  }

  deleteCourseList(name:string):Observable<any>{
    let deleteUrl = `/api/secure/schedules/delete/${name}`
    return this.http.delete<any>(this.baseUrl+deleteUrl,this.httpsOptions);
  }

  getUserCourseListyId(id:String):Observable<any>{
    let url = `/api/secure/courselists/${id}`;
    return this.http.get<any>(this.baseUrl+url);
  }

  updateUserCoursList(name,resObj):Observable<any>{
    let updateUrl = `/api/secure/schedules/update/${name}`;
    return this.http.put<any>(this.baseUrl+updateUrl,resObj,this.httpsOptions);
  }

  getUserCreateCount(name):Observable<any>{
    let url = `/api/secure/usercount/${name}`;
    return this.http.get<any>(this.baseUrl+url);
  }

  createReview(resObj):Observable<any>{
    let url = '/api/secure/reviews/create';
    return this.http.post<any>(this.baseUrl+url,resObj,this.httpsOptions);
  }

  getOpenReview(subject,course):Observable<any>{
    let url = `/api/secure/openreviews/${subject}/${course}`;
    return this.http.get<any>(this.baseUrl+url);
  }

  getUsers():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/api/admin/userslist");
  }

  updateUserStatus(username, resObject):Observable<any>{
    let url = `/api/admin/status/${username}`;
    return this.http.put<any>(this.baseUrl+url,resObject,this.httpsOptions);
  }

  getReviews():Observable<any>{
    let url = '/api/admin/reviews';
    return this.http.get<any>(this.baseUrl+url);
  }

  updateReviewStatus(subject,course,resObject) : Observable<any>{
    let url = `/api/admin/review/${subject}/${course}`;
    return this.http.put<any>(this.baseUrl+url,resObject,this.httpsOptions);
  }
}
