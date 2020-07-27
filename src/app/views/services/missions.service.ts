import {Injectable} from '@angular/core';
import {MissionType} from '../models/missionType';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Mission} from '../models/mission';
import {CompanyModel} from '../models/company.model';
import {SchoolModel} from '../models/school.model';
import {TagsModel} from '../models/tags.model';
import {CertificationsModel} from '../models/certifications.model';
import {DealsCommercial} from '../models/dealsCommercial';
import {ActionTypes} from '../models/actionTypes';
import {TrainingLevelModel} from '../models/trainingLevel.model';
import {MissionStatusModel} from '../models/missionStatus.model';
import {BStatutModel} from '../models/bStatut.model';
import {ActionStatus} from '../models/actionStatus';
import {SkillCategoriesModel} from '../models/request/skillCategories.model';
import {ManagerialAbilityModel} from '../models/managerialAbility.model';
import {FieldsOfActivityModel} from '../models/fieldsOfActivity.model';
import {SkillsModel} from '../models/skills.model';
import {CvtModel} from '../models/cvt.model';
import {CertificationDomainsModel} from '../models/certificationDomains.model';
import {Observable} from 'rxjs';
import {Response} from '../../models/response.model';
import {LanguageModel} from '../models/language.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
if (localStorage.getItem('accessToken')) {
  headers = headers.set('Authorization', localStorage.getItem('accessToken'));
}

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  private urlApi: string;
  public header = headers;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getMissionFinnished(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/mission/dateFinished`, {headers: this.header});
  }

  postMissionFinnished(id: number, bool: boolean): Observable<Response<any>> {
    return this.httpClient.put<Response<any>>(`${this.urlApi}/mission/choice/${id}`, bool, {headers: this.header});
  }

  getMissionType(): Observable<Response<Array<MissionType>>> {
    return this.httpClient.get<Response<Array<MissionType>>>(`${this.urlApi}/missionTypes`, {headers: this.header});
  }

  getCompanies(): Observable<Response<Array<CompanyModel>>> {
    return this.httpClient.get<Response<Array<CompanyModel>>>(`${this.urlApi}/companies`, {headers: this.header});
  }

  getTypeActions(): Observable<Response<Array<ActionTypes>>> {
    return this.httpClient.get<Response<Array<ActionTypes>>>(`${this.urlApi}/actionTypes`, {headers: this.header});
  }

  getTrainingLevels(): Observable<Response<Array<TrainingLevelModel>>> {
    return this.httpClient.get<Response<Array<TrainingLevelModel>>>(`${this.urlApi}/trainingLevel`, {headers: this.header});
  }

  getMissionStatus(): Observable<Response<Array<MissionStatusModel>>> {
    return this.httpClient.get<Response<Array<MissionStatusModel>>>(`${this.urlApi}/missionStatus`, {headers: this.header});
  }

  getAffaireStatus(): Observable<Response<Array<BStatutModel>>> {
    return this.httpClient.get<Response<Array<BStatutModel>>>(`${this.urlApi}/businessStatus`, {headers: this.header});
  }

  getActionStatus(): Observable<Response<Array<ActionStatus>>> {
    return this.httpClient.get<Response<Array<ActionStatus>>>(`${this.urlApi}/actionStatus`, {headers: this.header});
  }

  getSkillCategories(): Observable<Response<Array<SkillCategoriesModel>>> {
    return this.httpClient.get<Response<Array<SkillCategoriesModel>>>(`${this.urlApi}/skillCategories`, {headers: this.header});
  }

  getManagerialAbilities(): Observable<Response<Array<ManagerialAbilityModel>>> {
    return this.httpClient.get<Response<Array<ManagerialAbilityModel>>>(`${this.urlApi}/managerialAbilitiesCat`, {headers: this.header});
  }

  getManagAbilities(): Observable<Response<Array<ManagerialAbilityModel>>> {
    return this.httpClient.get<Response<Array<ManagerialAbilityModel>>>(`${this.urlApi}/managerialAbilities`, {headers: this.header});
  }

  getFieldOfActivity(): Observable<Response<Array<FieldsOfActivityModel>>> {
    return this.httpClient.get<Response<Array<FieldsOfActivityModel>>>(`${this.urlApi}/fieldsOfActivity`, {headers: this.header});
  }

  getSkills(): Observable<Response<Array<SkillsModel>>> {
    return this.httpClient.get<Response<Array<SkillsModel>>>(`${this.urlApi}/skills`, {headers: this.header});
  }

  getSkillsTable(page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/skills/paged-list?page=${page}&size=5`, {headers: this.header});
  }

  getSchools(): Observable<Response<Array<SchoolModel>>> {
    return this.httpClient.get<Response<Array<SchoolModel>>>(`${this.urlApi}/schools`, {headers: this.header});
  }

  getTags(): Observable<Response<Array<TagsModel>>> {
    return this.httpClient.get<Response<Array<TagsModel>>>(`${this.urlApi}/tags`, {headers: this.header});
  }
  getLanguages(): Observable<Response<Array<LanguageModel>>> {
    return this.httpClient.get<Response<Array<LanguageModel>>>(`${this.urlApi}/languages`, {headers: this.header});
  }

  getCertifications(): Observable<Response<Array<CertificationsModel>>> {
    return this.httpClient.get<Response<Array<CertificationsModel>>>(`${this.urlApi}/certifications`, {headers: this.header});
  }

  getCertificationsDomaine(): Observable<Response<Array<CertificationDomainsModel>>> {
    return this.httpClient.get<Response<Array<CertificationDomainsModel>>>(`${this.urlApi}/certificationDomains`, {headers: this.header});
  }

  getDeals(): Observable<Response<Array<DealsCommercial>>> {
    return this.httpClient.get<Response<Array<DealsCommercial>>>(`${this.urlApi}/dealsCommercials`, {headers: this.header});
  }

  rechercheMulti(body, page: number): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.urlApi}/candidates/filter?page=${page}&size=5`,
      {
        filter: body,
        sort: null
      }, {headers: this.header}
    );
  }

  getCvt(page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/candidates/paged-list?page=${page}&size=6`, {headers: this.header});
  }

  addCompany(body): Observable<Response<Array<CompanyModel>>> {
    return this.httpClient.post<Response<Array<CompanyModel>>>(`${this.urlApi}/companies`, body, {headers: this.header});
  }

  addSchool(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/schools`, body, {headers: this.header});
  }

  addTag(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/tags`, body, {headers: this.header});
  }

  addCertification(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/certifications`, body, {headers: this.header});
  }

  addCertificationDomain(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/certificationDomains`, body, {headers: this.header});
  }

  addTypeMission(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/missionTypes`, body, {headers: this.header});
  }

  addTypeAction(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/actionTypes`, body, {headers: this.header});
  }

  addTrainingLevel(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/trainingLevel`, body, {headers: this.header});
  }

  addMissionStatu(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/missionStatus`, body, {headers: this.header});
  }

  addAffaireStatu(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/businessStatus`, body, {headers: this.header});
  }

  addSkillCategory(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/skillCategories`, body, {headers: this.header});
  }

  addManagerialAbility(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/managerialAbilitiesCat`, body, {headers: this.header});
  }

  addManagAbility(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/managerialAbilities`, body, {headers: this.header});
  }

  addFieldActivity(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/fieldsOfActivity`, body, {headers: this.header});
  }

  addSkill(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/skills`, body, {headers: this.header});
  }

  addActionStatu(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/actionStatus`, body, {headers: this.header});
  }

  addDeal(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/dealsCommercials`, body, {headers: this.header});
  }

  editCompany(id: number, body): Observable<Response<Array<CompanyModel>>> {
    return this.httpClient.put<Response<Array<CompanyModel>>>(`${this.urlApi}/companies/${id}`, body, {headers: this.header});
  }

  editSchool(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/schools/${id}`, body, {headers: this.header});
  }

  editTag(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/tags/${id}`, body, {headers: this.header});
  }

  editCertification(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/certifications/${id}`, body, {headers: this.header});
  }

  editCertificationDomain(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/certificationDomains/${id}`, body, {headers: this.header});
  }

  editTypeMission(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/missionTypes/${id}`, body, {headers: this.header});
  }

  editTypeAction(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/actionTypes/${id}`, body, {headers: this.header});
  }

  editTrainingLevel(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/trainingLevel/${id}`, body, {headers: this.header});
  }

  editMissionStatu(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/missionStatus/${id}`, body, {headers: this.header});
  }

  editAffaireStatu(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/businessStatus/${id}`, body, {headers: this.header});
  }

  editManagerialAbility(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/managerialAbilitiesCat/${id}`, body, {headers: this.header});
  }

  editManagAbility(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/managerialAbilities/${id}`, body, {headers: this.header});
  }

  editFieldActivity(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/fieldsOfActivity/${id}`, body, {headers: this.header});
  }

  editSkill(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/skills/${id}`, body, {headers: this.header});
  }

  editActionStatu(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/actionStatus/${id}`, body, {headers: this.header});
  }

  editDeal(id: number, body): Observable<Response<Array<any>>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/dealsCommercials/${id}`, body, {headers: this.header});
  }

  deleteCompany(id: number): Observable<Response<Array<CompanyModel>>> {
    return this.httpClient.delete<Response<Array<CompanyModel>>>(`${this.urlApi}/companies/${id}`, {headers: this.header});
  }

  deleteSchool(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/schools/${id}`, {headers: this.header});
  }

  deleteTag(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/tags/${id}`, {headers: this.header});
  }

  deleteCertification(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/certifications/${id}`, {headers: this.header});
  }

  deleteCertificationDomain(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/certificationDomains/${id}`, {headers: this.header});
  }

  deleteTypeMission(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/missionTypes/${id}`, {headers: this.header});
  }

  deleteTypeAction(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/actionTypes/${id}`, {headers: this.header});
  }

  deleteTrainingLevel(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/trainingLevel/${id}`, {headers: this.header});
  }

  deleteMissionStatu(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/missionStatus/${id}`, {headers: this.header});
  }

  deleteAffaireStatu(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/businessStatus/${id}`, {headers: this.header});
  }

  deleteActionStatu(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/actionStatus/${id}`, {headers: this.header});
  }

  deleteSkillCategory(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/skillCategories/${id}`, {headers: this.header});
  }

  deleteManagerialAbility(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/managerialAbilitiesCat/${id}`, {headers: this.header});
  }

  deleteManagAbility(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/managerialAbilities/${id}`, {headers: this.header});
  }

  deleteFieldActivity(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/fieldsOfActivity/${id}`, {headers: this.header});
  }

  addMission(customer: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/mission/save`, customer, {headers: this.header});
  }

  getMId(id: number): Observable<Response<Mission>> {
    return this.httpClient.get<Response<Mission>>(`${this.urlApi}/mission/${id}`, {headers: this.header});
  }

  editMission(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/mission/update/${id}`, customer, {headers: this.header});
  }

  pushFile(file: File): Observable<HttpEvent<any>> {
    return this.httpClient.post<HttpEvent<Array<any>>>(`${this.urlApi}/attachments/upload`, file, {headers: this.header});
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('files', file);
    const url = `${this.urlApi}/attachments/upload`;
    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text',
    });
    const req2 = req.clone({});
    return this.httpClient.request(req2);
  }

}
