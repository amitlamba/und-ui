import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {HttpClient, HttpParameterCodec, HttpParams} from '@angular/common/http';
import {AppSettings} from "../_settings/app-settings";
import {RegistrationRequest, ServiceProviderCredentials, UserProfileRequest} from "../_models/client";
import {MessageService} from "./message.service";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {SegmentService} from "./segment.service";

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private httpClient: HttpClient, private messageService: MessageService, private segmentService: SegmentService) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string, recaptchaToken: string): Observable<any> {
    const params = new HttpParams().set("recaptchaToken", recaptchaToken);
    return this.httpClient.post(AppSettings.API_ENDPOINT_AUTH_AUTH, {username: username, password: password}, {params})
      .map((response: any) => {
        console.log(response);
        // login successful if there's a jwt token in the response
        let token = response.data.value.token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
        }
        return response;
      });
  }

  getUsername(): string {
    return JSON.parse(localStorage.getItem('currentUser')).username;
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');

    //Clean Lists and other things if necessary
    this.segmentService.eventUserList = null;
  }

  register(registrationRequest: RegistrationRequest, recaptchaToken: string): Observable<any> {
    const params = new HttpParams().set("recaptchaToken", recaptchaToken);
    return this.httpClient.post(AppSettings.API_ENDPOINT_AUTH_REGISTER, registrationRequest, {params})
      .pipe(
        tap(next => this.messageService.addSuccessMessage(registrationRequest.name + " registered successfully. An email has been sent to your registered email address. Please validate before login."))
        // ,
        // catchError(this.handleError<any>('register'))
      );
  }

  forgotpassword(email: string, recaptchaToken: string): Observable<any> {
    const params = new HttpParams().set("recaptchaToken", recaptchaToken);
    return this.httpClient.get(AppSettings.API_ENDPOINT_AUTH_REGISTER_FORGOTPASSWORD + "/" + email, {params})
      .pipe(
        tap(next => this.messageService.addSuccessMessage("Please see your email " + email + " to reset password."))
        // ,
        // catchError(this.handleError<any>('Failed To Forgot Password'))
      );
  }

  resetpassword(code: string): Observable<any> {
    return this.httpClient.get(AppSettings.API_ENDPOINT_AUTH_REGISTER_RESETPASSWORD + "/" + code + '/');
    // .pipe(
    //   tap(next => this.messageService.addSuccessMessage("Password Reset Successfully")),
    //   catchError(this.handleError<any>('Error!'))
    // );
  }

  resetpasswordupdate(code: string, password: string): Observable<any> {
    return this.httpClient.post(AppSettings.API_ENDPOINT_AUTH_REGISTER_RESETPASSWORD + "/" + code + "/",
      {password: password})
      .pipe(
        tap(next => this.messageService.addSuccessMessage("Password Reset Successfully")),
        catchError(this.handleError<any>('Please Enter Password Again.'))
      );
  }

  verifyEmail(email: string, code: string): Observable<any> {
    //${authUrl}/register/verifyemail/${client.email}/${client.clientVerification.emailCode}
    return this.httpClient.get(AppSettings.API_ENDPOINT_AUTH_REGISTER_VERIFYEMAIL + "/" + email + "/" + code);
  }

  getUserDetails(): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_AUTH_SETTING_USERDETAILS)
      .pipe(
        tap(next => this.messageService.addSuccessMessage("User Details Fetched successfully")),
        catchError(this.handleError<any>('User Details fetching'))
      );
  }

  updateUserDetails(userProfileRequest: UserProfileRequest): Observable<any> {
    return this.httpClient.post(AppSettings.API_ENDPOINT_AUTH_SETTING_UPDATEUSERDETAILS, userProfileRequest)
      .pipe(
        tap(next => this.messageService.addSuccessMessage("User Details updated successfully")),
        catchError(this.handleError<any>('User Details Update'))
      );
  }

  verifyFromEmailAddress(code:string):Observable<any>{
    let params:HttpParams=new HttpParams({encoder: new CustomEncoder()}).set("c",code);
    return this.httpClient.get(AppSettings.API_ENDPOINT_CLIENT_SETTING_VERIFY_FROM_EMAIL,{params})
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.addDangerMessage(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
