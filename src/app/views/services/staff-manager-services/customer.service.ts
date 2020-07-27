import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../../core/models/response.model';
import {environment} from '../../../../environments/environment';
import {CustomerModel} from '../../models/customer.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class CustomerService {

  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  createCustomer(customer: CustomerModel): Observable<Response<CustomerModel>> {
    return this.httpClient.post<Response<CustomerModel>>(`${this.urlApi}/customers`, customer, {headers: headers});
  }

  getListCustomers(): Observable<Response<Array<CustomerModel>>> {
    return this.httpClient.get<Response<Array<CustomerModel>>>(`${this.urlApi}/customers`, {headers: headers});
  }

  getPageableCustomers(page: number, pageSize: number): Observable<Response<Array<CustomerModel>>> {
    return this.httpClient.get<Response<Array<CustomerModel>>>(`${this.urlApi}/customers/paged-list?page=${page}&size=${pageSize}`, {headers: headers});
  }

  dropCustomer(idCustomer: number):
    Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.urlApi}/customers/${idCustomer}`, {headers: headers});
  }

  editCustomer(idCustomer: number, customer: CustomerModel): Observable<Response<CustomerModel>> {
    return this.httpClient.put<Response<CustomerModel>>(`${this.urlApi}/customers/${idCustomer}`, customer, {headers: headers});
  }

  getCustomer(idCustomer: number): Observable<Response<CustomerModel>> {
    return this.httpClient.get<Response<CustomerModel>>(`${this.urlApi}/customers/${idCustomer}`, {headers: headers});
  }
}
