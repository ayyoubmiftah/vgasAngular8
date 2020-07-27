import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../../core/models/response.model';
import {PurchaseOrder} from '../../models/request/purchaseOrder';
import {Quote} from '../../models/request/quotes';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('Authorization', 'eyJhbGciOiJIUzUxMiJ9.eyJjcmVhdGVkIjoxNTU2NjQzNTQzMzc4LCJhdXR0eXBlIjoiU0lNUExFIiwibmFtZSI6ImFkbWluIEFMIEFETUlOIiwiYWRtaW4iOnRydWUsImlkIjoyLCJleHAiOjYyMDM2NjQzNTQzLCJlbWFpbCI6ImFkbWluQGl0bGVhZGVyLm1hIiwidXNlcm5hbWUiOiJhZG1pbiJ9.qRa-Wtiw6a9-Oam3Hdqx61S-SKuTBSUHRTQF9mbIN3Xm8xJ61y_HPKsdUz7Cbts4iUVPcHTZ0USQgnWs1TdaqQ');

@Injectable()
export class PurchaseOrderService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getListPurchaseOrders(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(this.urlApi + '/purchaseOrders',{headers: headers});
  }

  createPurchaseOrder(purchaseOrder: PurchaseOrder) {
    return this.httpClient.post(`${this.urlApi}/purchaseOrders`, purchaseOrder, {headers: headers});
  }

  getPurchaseOrderById(idPurchaseOrder: number): Observable<Response<PurchaseOrder>> {
    return this.httpClient.get<Response<PurchaseOrder>>(this.urlApi + `/purchaseOrders/${idPurchaseOrder}`,{ headers: headers});
  }

  updatePurchaseOrder(idPurchaseOrder: number, purchaseOrder: PurchaseOrder): Observable<Response<PurchaseOrder>> {
    return this.httpClient.put<Response<PurchaseOrder>>(`${this.urlApi}/purchaseOrders/${idPurchaseOrder}`, purchaseOrder, {headers: headers});
  }

  deletePurchaseOrder(idPurchaseOrder: number): Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.urlApi}/purchaseOrders/${idPurchaseOrder}`, {headers: headers});
  }

}
