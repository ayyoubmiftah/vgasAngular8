import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response} from '../../../core/models/response.model';
import {Channel} from '../../models/channel.model';
import {Priority} from '../../models/priority.model';
import {Profile} from '../../models/profile.model';
import {Equipment} from '../../models/equipment.model';
import {EquipmentCostTypeModel} from '../../models/equipmentCostType.model';
import {EquipmentCostUnitModel} from '../../models/equipmentCostUnit.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class ReferenceService {
  private urlApi: string;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  /**
   * Channel
   */
  getListChannels(): Observable<Response<Array<Channel>>> {
    return this.httpClient.get<Response<Array<Channel>>>(`${this.urlApi}/channels`);
  }

  getPageableListChannels(page: number, pageSize: number, keyword?: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/channels/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`);
    } else {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/channels/paged-list?page=${page}&size=${pageSize}`);
    }
  }

  dropChannel(idChannel: number): Observable<Response<Channel>> {
    return this.httpClient.delete<Response<Channel>>(`${this.urlApi}/channels/${idChannel}`, {headers: headers});
  }

  saveChannel(channel: Channel): Observable<Response<Channel>> {
    return this.httpClient.post<Response<Channel>>(`${this.urlApi}/channels`, channel, {headers: headers});
  }

  getChannel(idChannel: number): Observable<Response<Channel>> {
    return this.httpClient.get<Response<Channel>>(`${this.urlApi}/channels/${idChannel}`, {headers: headers});
  }

  editChannel(idChannel: number, channel: Channel): Observable<Response<Channel>> {
    return this.httpClient.put<Response<Channel>>(`${this.urlApi}/channels/${idChannel}`, channel, {headers: headers});
  }

  /**
   * Priority
   */
  getListPriority(): Observable<Response<Array<Priority>>> {
    return this.httpClient.get<Response<Array<Profile>>>(`${this.urlApi}/priorities`);
  }

  getPageableListPriority(page: number, pageSize: number, keyword?: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/priorities/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`);
    } else {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/priorities/paged-list?page=${page}&size=${pageSize}`);
    }
  }

  dropPriority(idPriority: number): Observable<Response<Priority>> {
    return this.httpClient.delete<Response<Priority>>(`${this.urlApi}/priorities/${idPriority}`, {headers: headers});
  }

  savePriority(priority: Priority): Observable<Response<Channel>> {
    return this.httpClient.post<Response<Channel>>(`${this.urlApi}/priorities`, priority, {headers: headers});
  }

  getPriority(idPriority: number): Observable<Response<Priority>> {
    return this.httpClient.get<Response<Priority>>(`${this.urlApi}/priorities/${idPriority}`, {headers: headers});
  }

  editPriority(idPriority: number, priority: Priority): Observable<Response<Priority>> {
    return this.httpClient.put<Response<Priority>>(`${this.urlApi}/priorities/${idPriority}`, priority, {headers: headers});
  }

  /**
   * equipments
   */
  getListEquipment(): Observable<Response<Array<Equipment>>> {
    return this.httpClient.get<Response<Array<Profile>>>(`${this.urlApi}/equipments`);
  }

  getPageableListEquipment(page: number, pageSize: number, keyword?: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/equipments/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`);
    } else {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/equipments/paged-list?page=${page}&size=${pageSize}`);
    }
  }

  dropEquipment(idEquipment: number): Observable<Response<Equipment>> {
    return this.httpClient.delete<Response<Equipment>>(`${this.urlApi}/equipments/${idEquipment}`, {headers: headers});
  }

  saveEquipment(equipment: Equipment): Observable<Response<Equipment>> {
    return this.httpClient.post<Response<Equipment>>(`${this.urlApi}/equipments`, equipment, {headers: headers});
  }

  getEquipment(idEquipment: string): Observable<Response<Equipment>> {
    return this.httpClient.get<Response<Equipment>>(`${this.urlApi}/equipments/${idEquipment}`, {headers: headers});
  }

  editEquipment(idEquipment: number, equipment: Equipment): Observable<Response<Equipment>> {
    return this.httpClient.put<Response<Equipment>>(`${this.urlApi}/equipments/${idEquipment}`, equipment, {headers: headers});
  }

  /**
   * Equipment Cost Type
   */

  getPageableListEquipmentCostType(page: number, pageSize: number, keyword?: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/equipmentCostTypes/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`);
    } else {
      this.httpClient.get<Response<any>>(`${this.urlApi}/equipmentCostTypes/paged-list?page=${page}&size=${pageSize}`);
    }
  }

  getListEquipmentCostTypes(): Observable<Response<Array<EquipmentCostTypeModel>>> {
    return this.httpClient.get<Response<Array<EquipmentCostTypeModel>>>(`${this.urlApi}/equipmentCostTypes`, {headers: headers});
  }

  getEquipmentCostType(idEquipmentCostType: string): Observable<Response<EquipmentCostTypeModel>> {
    return this.httpClient.get<Response<EquipmentCostTypeModel>>(`${this.urlApi}/equipmentCostTypes/${idEquipmentCostType}`, {headers: headers});
  }

  dropEquipmentCosttype(idEquipmentCostType: number): Observable<Response<EquipmentCostTypeModel>> {
    return this.httpClient.delete<Response<any>>(`${this.urlApi}/equipmentCostTypes/${idEquipmentCostType}`, {headers: headers})
  }

  saveEquipmentCostType(equipmentCostType: EquipmentCostTypeModel): Observable<Response<EquipmentCostTypeModel>> {
    return this.httpClient.post<Response<EquipmentCostTypeModel>>(`${this.urlApi}/equipmentCostTypes`, equipmentCostType);
  }

  editEquipmentCostType(idEquipmentCostType: number, equipmentCostType: EquipmentCostTypeModel): Observable<Response<EquipmentCostTypeModel>> {
    return this.httpClient.put<Response<EquipmentCostTypeModel>>(`${this.urlApi}/equipmentCostTypes/${idEquipmentCostType}`, equipmentCostType);
  }

  /**
   * Equipment Cost Units
   */

  getPageableListEquipmentCostUnit(page: number, pageSize: number, keyword?: string): Observable<Response<any>> {
    if (keyword) {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/equipmentCostUnits/paged-list?page=${page}&size=${pageSize}&keyword=${keyword}`, {headers: headers});
    } else {
      return this.httpClient.get<Response<any>>(`${this.urlApi}/equipmentCostUnits/paged-list?page=${page}&Size=${pageSize}`, {headers: headers});
    }
  }

  getListEquipmentCostUnits(): Observable<Response<Array<EquipmentCostUnitModel>>> {
    return this.httpClient.get<Response<Array<EquipmentCostUnitModel>>>(`${this.urlApi}/equipmentCostUnits`, {headers: headers});
  }

  getEquipmentCostUnit(idEquipmentCostUnit: string): Observable<Response<EquipmentCostUnitModel>> {
    return this.httpClient.get<Response<EquipmentCostUnitModel>>(`${this.urlApi}/equipmentCostUnits/${idEquipmentCostUnit}`, {headers: headers});
  }

  dropEquipmentCostUnit(idEquipmentCostUnit: number): Observable<Response<EquipmentCostUnitModel>> {
    return this.httpClient.delete<Response<EquipmentCostUnitModel>>(`${this.urlApi}/equipmentCostUnits/${idEquipmentCostUnit}`, {headers: headers});
  }

  saveEquipmentCostUnit(equipmentCostUnit: EquipmentCostUnitModel): Observable<Response<EquipmentCostUnitModel>> {
    return this.httpClient.post<Response<EquipmentCostUnitModel>>(`${this.urlApi}/equipmentCostUnits`, equipmentCostUnit);
  }

  editEquipmentCostUnit(idEquipmentCostUnit: number, equipmentCostUnit: EquipmentCostUnitModel): Observable<Response<EquipmentCostUnitModel>>{
    return this.httpClient.put<Response<EquipmentCostUnitModel>>(`${this.urlApi}/equipmentCostUnit/${idEquipmentCostUnit}`, equipmentCostUnit, {headers:headers});
  }

}
