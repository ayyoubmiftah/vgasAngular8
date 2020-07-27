import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../../core/models/response.model';
import {environment} from '../../../../environments/environment';
import {Quote} from '../../models/request/quotes';
import {Request} from '../../models/request/request';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('Authorization', 'eyJhbGciOiJIUzUxMiJ9.eyJjcmVhdGVkIjoxNTU2NjQzNTQzMzc4LCJhdXR0eXBlIjoiU0lNUExFIiwibmFtZSI6ImFkbWluIEFMIEFETUlOIiwiYWRtaW4iOnRydWUsImlkIjoyLCJleHAiOjYyMDM2NjQzNTQzLCJlbWFpbCI6ImFkbWluQGl0bGVhZGVyLm1hIiwidXNlcm5hbWUiOiJhZG1pbiJ9.qRa-Wtiw6a9-Oam3Hdqx61S-SKuTBSUHRTQF9mbIN3Xm8xJ61y_HPKsdUz7Cbts4iUVPcHTZ0USQgnWs1TdaqQ');

@Injectable()
export class QuoteService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getListQuotes(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(this.urlApi + '/quotes',{headers: headers});
  }

  createQuote(quote: Quote) {
    return this.httpClient.post(`${this.urlApi}/quotes`, quote, {headers: headers});
  }

  getQuoteById(idQuote: number): Observable<Response<Quote>> {
    return this.httpClient.get<Response<Quote>>(this.urlApi + `/quotes/${idQuote}`,{ headers: headers});
  }

  updateQuote(idQuote: number, quote: Quote): Observable<Response<Quote>> {
    return this.httpClient.put<Response<Quote>>(`${this.urlApi}/quotes/${idQuote}`, quote, {headers: headers});
  }

  deleteQuote(idQuote: number): Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.urlApi}/quotes/${idQuote}`, {headers: headers});
  }



}
