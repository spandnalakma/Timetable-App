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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      alert(error.error.errorMessage);
      return of(result as T);
    };
  }

  test():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/api/secure");
  }

  searchCourses(subject:string,course:string):Observable<any>{
    let searchUrl = `/api/open/courses/${subject}/${course}`;
    return this.http.get<any>(this.baseUrl+searchUrl).pipe(
      catchError(this.handleError<any>('searchCourses',[]))
    )
  }

  searchCourseswithKeywords(keyword:string):Observable<any>{
    let url = `/api/open/courses/${keyword}`;
    return this.http.get<any>(this.baseUrl+url).pipe(
      catchError(this.handleError<any>('searchCourseswithKeywords',[]))
    )
  }

  getpublicCourseLists(username):Observable<any>{
    let url = `/api/open/schedules/${username}`;
    return this.http.get<any>(this.baseUrl+url).pipe(
      catchError(this.handleError<any>('getpublicCourseLists',[]))
    )
  }

  getSubjectandCourseCodePairs():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/api/secure/courses").pipe(
      catchError(this.handleError<any>('getSubjectandCourseCodePairs',[]))
    )
  }

  createCourses(resObj):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/api/secure/schedules/create",resObj,this.httpsOptions).pipe(
      catchError(this.handleError<any>('createCourses',[]))
    )
  }

  getUserCourseLists(username):Observable<any>{
    let url = `/api/secure/usercourselists/${username}`
    return this.http.get<any>(this.baseUrl+url).pipe(
      catchError(this.handleError<any>('getUserCourseLists',[]))
    )
  }

  deleteCourseList(name:string):Observable<any>{
    let deleteUrl = `/api/secure/schedules/delete/${name}`
    return this.http.delete<any>(this.baseUrl+deleteUrl,this.httpsOptions).pipe(
      catchError(this.handleError<any>('deleteCourseList',[]))
    )
  }

  getUserCourseListyId(id:String):Observable<any>{
    let url = `/api/secure/courselists/${id}`;
    return this.http.get<any>(this.baseUrl+url).pipe(
      catchError(this.handleError<any>('getUserCourseListyId',[]))
    )
  }

  updateUserCoursList(name,resObj):Observable<any>{
    let updateUrl = `/api/secure/schedules/update/${name}`;
    return this.http.put<any>(this.baseUrl+updateUrl,resObj,this.httpsOptions).pipe(
      catchError(this.handleError<any>('updateUserCoursList',[]))
    )
  }

  getUserCreateCount(name):Observable<any>{
    let url = `/api/secure/usercount/${name}`;
    return this.http.get<any>(this.baseUrl+url).pipe(
      catchError(this.handleError<any>('getUserCreateCount',[]))
    )
  }

  createReview(resObj):Observable<any>{
    let url = '/api/secure/reviews/create';
    return this.http.post<any>(this.baseUrl+url,resObj,this.httpsOptions).pipe(
      catchError(this.handleError<any>('createReview',[]))
    )
  }

  getOpenReview(subject,course):Observable<any>{
    let url = `/api/secure/openreviews/${subject}/${course}`;
    return this.http.get<any>(this.baseUrl+url).pipe(
      catchError(this.handleError<any>('getOpenReview',[]))
    )
  }

  getUsers():Observable<any>{
    return this.http.get<any>(this.baseUrl+"/api/admin/userslist").pipe(
      catchError(this.handleError<any>('getUsers',[]))
    )
  }

  updateUserStatus(username, resObject):Observable<any>{
    let url = `/api/admin/status/${username}`;
    return this.http.put<any>(this.baseUrl+url,resObject,this.httpsOptions).pipe(
      catchError(this.handleError<any>('updateUserStatus',[]))
    )
  }

  getReviews():Observable<any>{
    let url = '/api/admin/reviews';
    return this.http.get<any>(this.baseUrl+url).pipe(
      catchError(this.handleError<any>('getReviews',[]))
    )
  }

  updateReviewStatus(id,resObject) : Observable<any>{
    let url = `/api/admin/review/${id}`;
    return this.http.put<any>(this.baseUrl+url,resObject,this.httpsOptions).pipe(
      catchError(this.handleError<any>('updateReviewStatus',[]))
    )
  }

  getUserTimetableForSchedules(coursename): Observable<any>{
    let url = `/api/open/userschedules/${coursename}`;
    return this.http.get<any>(this.baseUrl+url).pipe(
      catchError(this.handleError<any>('getUserTimetableForSchedules',[]))
    )
  }
}
