import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../../core/models/response.model';
import {environment} from '../../../../environments/environment';
import {ExecutorModel} from '../../models/executor.model';


let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class ExecutorService {

  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  createExecutor(executor: ExecutorModel): Observable<Response<ExecutorModel>> {
    return this.httpClient.post<Response<ExecutorModel>>(`${this.urlApi}/executors`, executor, {headers: headers});
  }

  getPageableExecutors(page: number, pageSize: number): Observable<Response<Array<ExecutorModel>>> {
    return this.httpClient.get<Response<Array<ExecutorModel>>>(`${this.urlApi}/executors/paged-list?page=${page}&size=${pageSize}`, {headers: headers});
  }

  dropExecutor(idExecutor: string):
    Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.urlApi}/executors/${idExecutor}`, {headers: headers});
  }

  editExecutor(idExecutor: number, executor: ExecutorModel): Observable<Response<ExecutorModel>> {
    return this.httpClient.put<Response<ExecutorModel>>(`${this.urlApi}/executors/${idExecutor}`, executor, {headers: headers});
  }

  getExecutor(idExecutor: string): Observable<Response<ExecutorModel>> {
    return this.httpClient.get<Response<ExecutorModel>>(`${this.urlApi}/executors/${idExecutor}`, {headers: headers});
  }

}
