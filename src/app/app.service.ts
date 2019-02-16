import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  private url = "https://chatapi.edwisor.com";//add new url

  constructor(public http: HttpClient) {} // end constructor

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }; // end getUserInfoFromLocalstorage

  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("mobileNumber", data.mobileNumber)
      .set("email", data.email)
      .set("password", data.password)
      .set("apiKey", data.apiKey);
    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  } // end of signupFunction function.

  public signinFunction(data: { email: any; password: any; }): Observable<any> {
    const params = new HttpParams()
      .set("email", data.email)
      .set("password", data.password);
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of signinFunction function.

  public setUserInfoInLocalStorage = (data: any) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
  };// end of setUserInfoInLocalStorage functions.

  public setUserInfoInSessionStorage = data => {
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  };// end of setUserInfoInLocalStorage functions.

  public logout(): Observable<any> {
    const params = new HttpParams().set("authToken", Cookie.get("authtoken"));
    return this.http.post(`${this.url}/api/v1/users/logout`, params);
  } // end logout function

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    } // end condition *if
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  } // END handleError
  
}
