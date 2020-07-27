import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../../core/models/response.model';
import {JobType} from '../../models/jobType.model';
import {environment} from '../../../../environments/environment';
import {Channel} from '../../models/channel.model';
import {Job} from '../../models/job.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class JobService {

  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  /**
   * JobType
   */

  getListJobType(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/job_types`);
  }

  getPageableListJobType(page: number, pageSize: number, keyword?: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/job_types/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`);
    } else {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/job_types/paged-list?page=${page}&size=${pageSize}`);
    }
  }

  dropJobType(idJobType: number): Observable<Response<JobType>> {
    return this.httpClient.delete<Response<JobType>>(`${this.urlApi}/job_types/${idJobType}`, {headers: headers});
  }

  saveJobType(jobType: JobType): Observable<Response<JobType>> {
    return this.httpClient.post<Response<Channel>>(`${this.urlApi}/job_types`, jobType, {headers: headers});
  }

  getJobType(idJobType: string): Observable<Response<JobType>> {
    return this.httpClient.get<Response<JobType>>(`${this.urlApi}/job_types/${idJobType}`, {headers: headers});
  }

  editJobType(idJobType: number, jobType: JobType): Observable<Response<JobType>> {
    return this.httpClient.put<Response<JobType>>(`${this.urlApi}/job_types/${idJobType}`, jobType, {headers: headers});
  }

  startJob(idJob: number, job: Job): Observable<Response<Job>> {
    return this.httpClient.put<Response<Job>>(`${this.urlApi}/start_job/${idJob}`, job, {headers: headers});
  }

  pauseJob(idJob: number, job: Job): Observable<Response<Job>> {
    return this.httpClient.put<Response<Job>>(`${this.urlApi}/pause_job/${idJob}`, job, {headers: headers});

  }

  cancelJob(idJob: number, job: Job): Observable<Response<Job>> {
    return this.httpClient.put<Response<Job>>(`${this.urlApi}/jobs/${idJob}/cancel`, job, {headers: headers});

  }

  updateJob(idJob: number, job: Job): Observable<Response<Job>> {
    return this.httpClient.put<Response<Job>>(`${this.urlApi}/jobs/${idJob}`, job, {headers: headers});
  }

  deleteJob(idJob: number): Observable<Response<Job>> {
    return this.httpClient.delete<Response<Job>>(`${this.urlApi}/jobs/${idJob}`, {headers: headers});

  }

  createJob(job: Job): Observable<Response<Job>> {
    return this.httpClient.post<Response<Job>>(`${this.urlApi}/jobs`, job, {headers: headers});

  }

  getListJobs(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(this.urlApi + '/jobs', {headers: headers});
  }

  getJobById(idJob: number): Observable<Response<Job>> {
    return this.httpClient.get<Response<Job>>(this.urlApi + `/jobs/${idJob}`, {headers: headers});
  }
}
