import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../../core/models/response.model';
import {environment} from '../../../../environments/environment';
import {TeamModel} from '../../models/team.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');


@Injectable()
export class TeamService {

  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getPageableTeams(page: number, pageSize: number): Observable<Response<Array<TeamModel>>> {
    return this.httpClient.get<Response<Array<TeamModel>>>(`${this.urlApi}/teams/paged-list?page=${page}&size=${pageSize}`,
      {headers: headers});
  }

  getTeam(idTeam: number): Observable<Response<TeamModel>> {
    return this.httpClient.get<Response<TeamModel>>(`${this.urlApi}/teams/${idTeam}`, {headers: headers});
  }

  createTeam(tean: TeamModel): Observable<Response<TeamModel>> {
    return this.httpClient.post<Response<TeamModel>>(`${this.urlApi}/teams`, tean, {headers: headers});
  }
  dropTeam(idTeam: number): Observable<Response<any>> {
    return this.httpClient.delete<Response<any>>(`${this.urlApi}/teams/${idTeam}`, {headers: headers});
  }
  editTeam(idTeam: number, team: TeamModel): Observable<Response<TeamModel>> {
    return this.httpClient.put<Response<TeamModel>>(`${this.urlApi}/teams/${idTeam}`, team, {headers: headers});
  }
}
