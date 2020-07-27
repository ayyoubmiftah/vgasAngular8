import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'environments/environment';
import {Response} from '../models/response.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class LoginTokenService {
  urlApi: string;
  accessToken: string = '';

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getToken(body: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.urlApi}/auth`, body, {headers: headers});
  }
}
