import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../core/models/response.model';


let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class RecoverPasswordService {
  urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  sendToken(email: string): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/auth/reset?email=${email}`);
  }

  resetPassword(token: string, password: string): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/auth/reset-password?token=${token}`, password, {headers: headers});
  }

}
