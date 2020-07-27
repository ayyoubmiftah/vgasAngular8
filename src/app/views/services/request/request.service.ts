import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Request } from '../../models/request/request';
import { Response } from '../../../core/models/response.model';
import { Observable } from 'rxjs/Observable';
import {AuthHelper} from '../../../core/services/security/auth.helper';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class RequestService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;

  }


  getListRequests(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(this.urlApi + '/requests',{ headers: headers});
  }

  getRequestById(idRequest: number): Observable<Response<Request>> {
    return this.httpClient.get<Response<Request>>(this.urlApi + `/requests/${idRequest}`,{ headers: headers});
  }

  createRequest(request: Request) {
    return this.httpClient.post(`${this.urlApi}/requests`, request, {headers: headers});
  }

  deleteRequest(idRequest: number): Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.urlApi}/requests/${idRequest}`, {headers: headers});
  }

  updateRequest(idRequest: number, request: Request): Observable<Response<Request>> {
    return this.httpClient.put<Response<Request>>(`${this.urlApi}/requests/${idRequest}`, request, {headers: headers});
  }

}
