import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../../core/models/response.model';
import {Observable} from 'rxjs/Observable';
import {environment} from 'environments/environment';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class ServicesService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  // termination requests
  getSubscriptions(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/subscriptions`);
  }

  getTerminationRequests(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination_requests`);
  }

  getTerminationRequest(id: string): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/termination_requests/${id}/find`);
  }

  saveTerminationRequest(request: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/termination_requests/save`, request, {headers: headers});
  }

  // complaint
  saveComplaint(complaint: any): Observable<Response<number>> {
    return this.httpClient.post<Response<number>>(`${this.urlApi}/complaints/save`, complaint, {headers: headers});
  }

  getComplaints(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/complaints`);
  }

  getComplaint(id: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/complaints/${id}/find`);
  }

  getObjects(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/complaints/objects`);
  }

  // User (temporary service TODO: remove it when localstorage is working)
  getUser(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/users/${id}/find`);
  }

  getAllAuthoritiesByCategory(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/authorities`);
  }
}
