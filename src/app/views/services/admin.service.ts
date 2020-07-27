import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../../core/models/response.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Profile} from '../models/profile.model';
import {User} from '../models/user.model';
import {Setting} from '../models/setting.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');


@Injectable()
export class AdminService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  // Profiles
  getListProfiles(): Observable<Response<Array<Profile>>> {
    return this.httpClient.get<Response<Array<Profile>>>(`${this.urlApi}/profiles`);
  }

  getPageableListProfiles(page: number, pageSize: number, keyword?: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/profiles/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`);
    } else {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/profiles/paged-list?page=${page}&size=${pageSize}`);
    }
  }

  dropProfile(idProfile: number) {
    return this.httpClient.post(`${this.urlApi}/profiles/${idProfile}/delete`, null, {headers: headers});
  }

  saveProfile(profile: Profile) {
    return this.httpClient.post(`${this.urlApi}/profiles/save`, profile, {headers: headers});
  }

  getProfile(idProfile: string): Observable<Response<Profile>> {
    return this.httpClient.get<Response<Profile>>(`${this.urlApi}/profiles/${idProfile}/find`, {headers: headers});
  }

  // Users
  getListUser(pageNo?: number, countNo?: number, keyword?: string): Observable<Response<Array<User>>> {
    return this.httpClient.get<Response<Array<User>>>(`${this.urlApi}/users/paged-list?page=${pageNo}&size=${countNo}
    &keyword=${keyword}`);
  }
  dropUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/${idUser}/delete`, null, {headers: headers});
  }

  createUser(user: User): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users`, user, {headers: headers});
  }

  enableUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/${idUser}/enable`, null, {headers: headers});
  }

  disableUser(idUser: number): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/${idUser}/disable`, null, {headers: headers});
  }

  editUser(user: User): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${this.urlApi}/users/edit`, user, {headers: headers});
  }

  getUser(idUser: string): Observable<Response<User>> {
    return this.httpClient.get<Response<User>>(`${this.urlApi}/users/${idUser}/find`, {headers: headers});
  }

  getProfileAuthorities(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/profiles/${id}/authorities`, {headers: headers});
  }

  /**
   * Settings
   */
  getSettings(): Observable<Response<Array<Setting>>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/settings`);
  }

  saveSettings(settings: Array<Setting>): Observable<Response<Array<Setting>>> {
    return this.httpClient.put<Response<Array<Setting>>>(`${this.urlApi}/settings`, settings, {headers: headers});
  }
}
