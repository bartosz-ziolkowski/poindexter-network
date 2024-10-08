/* tslint:disable */
/* eslint-disable */

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpContext } from '@angular/common/http';

import { ApiConfiguration } from '../api-configuration';
import { Authenticate$Params } from '../fn/authentication/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { BaseService } from '../base-service';
import { Confirm$Params } from '../fn/authentication/confirm';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Register$Params } from '../fn/authentication/register';
import { StrictHttpResponse } from '../strict-http-response';
import { UserResponse } from '../models/user-response';
import { authenticate } from '../fn/authentication/authenticate';
import { confirm } from '../fn/authentication/confirm';
import { map } from 'rxjs/operators';
import { register } from '../fn/authentication/register';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  private userSource = new BehaviorSubject<UserResponse | null>(null);
  user$ = this.userSource.asObservable();

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  setUser(token: string) {
    const jwtHelper = new JwtHelperService();
    const user = jwtHelper.decodeToken(token);
    this.userSource.next(user);
  }

  logout() {
    localStorage.clear();
    this.userSource.next(null);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(
    params: Register$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<{}>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<{}> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/auth/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(
    params: Authenticate$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(
    params: Authenticate$Params,
    context?: HttpContext
  ): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map(
        (
          r: StrictHttpResponse<AuthenticationResponse>
        ): AuthenticationResponse => r.body
      )
    );
  }

  /** Path part for operation `confirm()` */
  static readonly ConfirmPath = '/auth/activate-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(
    params: Confirm$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
    return this.confirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }
}
