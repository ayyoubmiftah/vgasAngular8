import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../../core/models/response.model';
import {ContractModel} from '../../models/contracts/contract.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class ContractService {


  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  createContract(contract: ContractModel): Observable<Response<ContractModel>> {
    return this.httpClient.post<Response<ContractModel>>(`${this.urlApi}/contracts`, contract, {headers: headers});
  }

  getPageableContracts(page: number, pageSize: number): Observable<Response<Array<ContractModel>>> {
    return this.httpClient.get<Response<Array<ContractModel>>>(`${this.urlApi}/contracts/paged-list?page=${page}&size=${pageSize}`
      , {headers: headers});
  }

  dropContract(id: number):
    Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.urlApi}/contracts/${id}`, {headers: headers});
  }

  editContract(id: number, contract: ContractModel): Observable<Response<ContractModel>> {
    return this.httpClient.put<Response<ContractModel>>(`${this.urlApi}/contracts/${id}`, contract, {headers: headers});
  }

  getContract(id: number): Observable<Response<ContractModel>> {
    return this.httpClient.get<Response<ContractModel>>(`${this.urlApi}/contracts/${id}`, {headers: headers});
  }

}
