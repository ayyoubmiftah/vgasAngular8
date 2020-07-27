import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../core/models/response.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class UtilsService {

  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getAuthorities(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/profiles/authorities`);
  }

  getConsumptionReport(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/download/consumptions`);
  }

  getSettlementsReport(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/download/settlements`);
  }
  getMissionFinnished(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/mission/dateFinished`);
  }
  postMissionFinnished(id: number,bool: boolean): Observable<Response<any>> {
    return this.httpClient.put<Response<any>>(`${this.urlApi}/mission/choice/${id}`,bool,{headers: headers});
  }

}
