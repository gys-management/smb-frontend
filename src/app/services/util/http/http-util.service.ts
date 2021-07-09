import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AppConstant } from 'src/app/constants/app.constants';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { AppError } from 'src/app/models/app-error';
import { HttpMethods, HttpRequestOptions } from 'src/app/models/http';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../logger/logger.service';
import { MessageService } from '../messages/message.service';
import { NetworkUtilService } from '../network/network-util.service';
import { SpinnerService } from '../spinner/spinner.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth/auth.service';

interface IRequestOptions {
  body?: any;
  headers?: HttpHeaders;
  reportProgress?: boolean;
  params?: HttpParams;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  constructor(
    private _http: HttpClient,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService,
    private _networkUtilService: NetworkUtilService,
    private _storage: Storage,
    private _injector: Injector
  ) { }

  async getToken() {
    const data = await this._storage.get(AppConstant.AUTH_DATA_STORAGE);
    if (data) {
      return JSON.parse(data)._token;
    }
  }

  async makeRequest(
    url: string,
    requestMethod: HttpMethods,
    requestBody?: any,
    // queryParams?: object,
    queryParams?: HttpParams,
    requestHeaders?: HttpHeaders,
    options: HttpRequestOptions = {
      excludeAuthHeader: false
    }
  ): Promise<any> {


    const requestURL = environment.restAPI + url;

    requestHeaders = requestHeaders || new HttpHeaders();
    if (!options?.excludeAuthHeader) {
      const _authService: AuthService = this._injector.get(AuthService);
      _authService.token.subscribe(async (tokenLocal) => {
        if (tokenLocal) {
          requestHeaders = requestHeaders.append(
            'Authorization',
            `Bearer ${tokenLocal}`
          );
        }
        //   // else {
        //   //   const token = await _authService.getToken();
        //   //   requestHeaders = requestHeaders.append(
        //   //     'Authorization',
        //   //     `Bearer ${token}`
        //   //   );
        //   // }
      });

      // const token = await this.getToken();
      // requestHeaders = requestHeaders.append(
      //   'Authorization',
      //   `Bearer ${token}`
      // );
    }

    return this.makeExternalRequest(
      requestURL,
      requestMethod,
      requestBody,
      queryParams,
      requestHeaders,
      options
    );
  }


  private async makeExternalRequest(
    requestUrl: string,
    method: HttpMethods,
    requestBody?: any,
    // queryParams?: object,
    queryParams?: HttpParams,
    requestHeaders?: HttpHeaders,
    { hideSpinner, spinnerMessage, spinnerOptions }: HttpRequestOptions = {
      hideSpinner: false,
    }
  ): Promise<any> {
    // Set Request Headers
    let headers: HttpHeaders = requestHeaders || new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    // Set Query Params
    // let params: HttpParams = new HttpParams();
    // if (queryParams) {
    //   for (const key in queryParams) {
    //     if (key && queryParams.hasOwnProperty(key)) {
    //       params = params.set(key, queryParams[key]);
    //     }
    //   }
    // }

    // Set Request Options
    const requestOptions: IRequestOptions = {
      body: requestBody,
      headers,
      params: queryParams,
    };

    let spinnerId: string;
    if (!hideSpinner) {
      spinnerId = await this._spinnerService.presentSpinner(
        spinnerMessage,
        spinnerOptions
      );
    }

    LoggerService.debug(
      `HTTP Request`,
      `\nMethod: ${method}`,
      `\nUrl: ${requestUrl}`,
      `\nOptions: `,
      requestOptions
    );

    try {
      const response: any = await this._http
        .request(method, requestUrl, requestOptions)
        .toPromise();
      LoggerService.debug(`HTTP Response: `, response);

      if (!hideSpinner) {
        await this._spinnerService.dismissSpinner(spinnerId);
      }

      return response;
    } catch (err) {
      LoggerService.error(err);
      if (spinnerId) {
        await this._spinnerService.dismissSpinner(spinnerId);
      }
      // if (!hideSpinner) {
      //   await this.spinnerService.hideSpinner(spinnerType);
      // }

      const errorResponse: AppError = await this.handleHttpError(err);
      return Promise.reject(errorResponse);
    }
  };

  /*
  async makeMultiPartRequest(
    baseURL: string,
    path: string,
    method: HttpRequestMethods,
    requestBody?: FormData,
    queryParams?: object,
    requestHeaders?: HttpHeaders,
    { hideSpinner = true, spinnerType = SpinnerType.BLOCKING } = {}
  ) {
    const requestURL = environment.apiServerURL + baseURL + path;

    // Set Request Headers
    const headers: HttpHeaders = requestHeaders || new HttpHeaders();
    // headers = headers.set('Content-Type', 'multipart/form-data');

    // Set Query Params
    let params: HttpParams = new HttpParams();
    if (queryParams) {
      for (const key in queryParams) {
        if (key && queryParams.hasOwnProperty(key)) {
          this.logger.debug(`${key} ${queryParams[key]}`);
          params = params.set(key, queryParams[key]);
        }
      }
    }

    // Set Request Options
    const requestOptions: IRequestOptions = {
      body: requestBody,
      headers,
      params,
    };

    if (!hideSpinner) {
      await this.spinnerService.presentSpinner(spinnerType);
    }

    try {
      const response: any = await this.http
        .request(method, requestURL, requestOptions)
        .toPromise()
        .then((res) => res);
      this.logger.debug(`Response: `, response);

      if (!hideSpinner) {
        await this.spinnerService.hideSpinner(spinnerType);
      }

      if (response.isSuccess) {
        return response.data;
      } else {
        return Promise.reject(
          new AppError(response.error.code, response.error.description)
        ); // add error message and code
      }
    } catch (err) {
      this.logger.error(err);
      if (!hideSpinner) {
        await this.spinnerService.hideSpinner(spinnerType);
      }

      const errorResponse: AppError = this.handleHttpError(err);
      return Promise.reject(errorResponse);
    }
  }

  async makeSecureMultiPartRequest(
    url: string,
    path: string,
    requestMethod: HttpRequestMethods,
    requestBody?: FormData,
    queryParams?: object,
    requestHeaders?: HttpHeaders,
    spinnerConfig?: SpinnerConfig
  ) {
    requestHeaders = requestHeaders || new HttpHeaders();
    requestHeaders = requestHeaders.append(
      'Authorization',
      `Bearer ${this.sessionService.getAccessToken()}`
    );
    return this.makeMultiPartRequest(
      url,
      path,
      requestMethod,
      requestBody,
      queryParams,
      requestHeaders,
      spinnerConfig
    );
  }
  */

  private async handleHttpError(err: any): Promise<AppError> {
    let appError: AppError = new AppError();
    switch (err.status) {
      case 500:
        appError = new AppError(
          null,
          ErrorConstant.ERR_GENERIC_CODE,
          ErrorConstant.ERR_GENERIC_EXCEPTION
        );
        break;
      case 0:
        appError = new AppError(
          null,
          ErrorConstant.ERR_GENERIC_CODE,
          ErrorConstant.ERR_GENERIC_EXCEPTION
        );
        break;
      default:
        appError = new AppError(null, err.error.errorCode, err.error.errorMessage);
        break;
    }
    // INFO: To avoid error toast message in initial login page, adding the condition for organization url
    if (!err.url.includes('organization')) {
      this._messageService.messageErrorToast(appError);
    }
    return appError;
  }
}
