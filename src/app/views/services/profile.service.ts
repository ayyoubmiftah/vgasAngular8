import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import {CustomervModel} from '../models/customerv.model';
import {SourcerModel} from '../models/Sourcer.model';
import {BusinessModel} from '../models/business.model';
import {CvtModel} from '../models/cvt.model';
import {DealsCommercial} from '../models/dealsCommercial';
import {Mission} from '../models/mission';
import {MissionSuggestModel} from '../models/missionSuggest.model';
import {MissionStatusModel} from '../models/missionStatus.model';
import {BStatutModel} from '../models/bStatut.model';
import {ActionStatus} from '../models/actionStatus';
import {ActionTypes} from '../models/actionTypes';
import {Contact} from '../models/contact';
import {SkillsModel} from '../models/skills.model';
import {SkillCategoriesModel} from '../models/request/skillCategories.model';
import {CandidateSkillModel} from '../models/candidateSkill.model';
import {ManagerialAbilityModel} from '../models/managerialAbility.model';
import {ManagerialCategoryModel} from '../models/managerialCategory.model';
import {CandidateManagerialAbilityModel} from '../models/candidateManagerialAbility.model';
import {TagsModel} from '../models/tags.model';
import {CandidateTagsDetailModel} from '../models/candidateTagsDetail.model';
import {LanguageModel} from '../models/language.model';
import {CandidateLanguageModel} from '../models/candidateLanguage.model';
import {CertificationDomainsModel} from '../models/certificationDomains.model';
import {CertificationsModel} from '../models/certifications.model';
import {SchoolModel} from '../models/school.model';
import {TrainingLevelModel} from '../models/trainingLevel.model';
import {TrainingsModel} from '../models/trainings.model';
import {CompanyModel} from '../models/company.model';
import {ExperiencesDetailsModel} from '../models/experiencesDetails.model';
import {ProjectsModel} from '../models/projects.model';
import {MissionSkillModel} from '../models/missionSkill.model';
import {MissionManagerialAbilityModel} from '../models/missionManagerialAbility.model';
import {MissionLanguageModel} from '../models/missionLanguage.model';
import {MissionTagsModel} from '../models/missionTags.model';
import {TestModel} from '../models/test.model';
import {CandidatesRealibilityModel} from '../models/candidatesRealibility.model';
import {ShortlistModel} from '../models/shortlist.model';
import {ShortlistTypeModel} from '../models/shortlistType.model';
import {ShorlistSeriesModel} from '../models/shorlistSeries.model';
import {Observable} from 'rxjs';
import {Response} from '../../models/response.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
if (localStorage.getItem('accessToken')) {
  headers = headers.set('Authorization', localStorage.getItem('accessToken'));
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  urlApi: string;
  public header = headers;

  constructor(private httpClient: HttpClient) {
    this.urlApi = environment.apiConfig.apiUrl;
  }

  getUser(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/users/${id}/find`, {headers: this.header});
  }

  getField(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/fieldsOfActivity`, {headers: this.header});
  }

  saveProfile(profile: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/users/save-client-profile`, profile, {headers: this.header});
  }

  addCustomer(customer: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/customers`, customer, {headers: this.header});
  }

  editCustomer(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/customers/${id}`, customer, {headers: this.header});
  }

  getCustomer(): Observable<Response<Array<CustomervModel>>> {
    return this.httpClient.get<Response<Array<CustomervModel>>>(`${this.urlApi}/customers`, {headers: this.header});
  }

  getCustomerPaged(page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<Array<CustomervModel>>>(`${this.urlApi}/customers/paged-list?page=${page}&size=9`, {headers: this.header});
  }

  getActionStatus(): Observable<Response<Array<ActionStatus>>> {
    return this.httpClient.get<Response<Array<ActionStatus>>>(`${this.urlApi}/actionStatus`, {headers: this.header});
  }

  getActionTypes(): Observable<Response<Array<ActionTypes>>> {
    return this.httpClient.get<Response<Array<ActionTypes>>>(`${this.urlApi}/actionTypes`, {headers: this.header});
  }

  getBIP(): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/business/countBIP`, {headers: this.header});
  }

  getCOC(id: number, page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/contacts/byCustomer/${id}?page=${page}&size=3`, {headers: this.header});
  }

  getCid(id: number): Observable<Response<CustomervModel>> {
    return this.httpClient.get<Response<CustomervModel>>(`${this.urlApi}/customers/${id}`, {headers: this.header});
  }

  getSkillsOfCategory(id: number): Observable<Response<Array<SkillsModel>>> {
    return this.httpClient.get<Response<Array<SkillsModel>>>(`${this.urlApi}/skills/CatSkill/${id}`, {headers: this.header});
  }

  getManagerialCategory(id: number): Observable<Response<Array<ManagerialCategoryModel>>> {
    return this.httpClient.get<Response<Array<ManagerialCategoryModel>>>(`${this.urlApi}/managerialAbilities/category/${id}`, {headers: this.header});
  }

  getSkillCategory(): Observable<Response<Array<SkillCategoriesModel>>> {
    return this.httpClient.get<Response<Array<SkillCategoriesModel>>>(`${this.urlApi}/skillCategories`, {headers: this.header});
  }

  getTestNames(): Observable<Response<Array<TestModel>>> {
    return this.httpClient.get<Response<Array<TestModel>>>(`${this.urlApi}/test`, {headers: this.header});
  }

  getTestNamesTable(body): Observable<Response<Array<CandidatesRealibilityModel>>> {
    return this.httpClient.post<Response<Array<CandidatesRealibilityModel>>>(`${this.urlApi}/candidatesReliability/detailsTest`, body, {headers: this.header});
  }

  getManagerialAbility(): Observable<Response<Array<ManagerialAbilityModel>>> {
    return this.httpClient.get<Response<Array<ManagerialAbilityModel>>>(`${this.urlApi}/managerialAbilitiesCat`, {headers: this.header});
  }

  getTags(): Observable<Response<Array<TagsModel>>> {
    return this.httpClient.get<Response<Array<TagsModel>>>(`${this.urlApi}/tags`, {headers: this.header});
  }

  getLanguages(): Observable<Response<Array<LanguageModel>>> {
    return this.httpClient.get<Response<Array<LanguageModel>>>(`${this.urlApi}/languages`, {headers: this.header});
  }

  getCertificationDomains(): Observable<Response<Array<CertificationDomainsModel>>> {
    return this.httpClient.get<Response<Array<CertificationDomainsModel>>>(`${this.urlApi}/certificationDomains`, {headers: this.header});
  }

  getSchools(): Observable<Response<Array<SchoolModel>>> {
    return this.httpClient.get<Response<Array<SchoolModel>>>(`${this.urlApi}/schools`, {headers: this.header});
  }

  getCompanies(): Observable<Response<Array<CompanyModel>>> {
    return this.httpClient.get<Response<Array<CompanyModel>>>(`${this.urlApi}/companies`, {headers: this.header});
  }

  getTrainingLevel(): Observable<Response<Array<TrainingLevelModel>>> {
    return this.httpClient.get<Response<Array<TrainingLevelModel>>>(`${this.urlApi}/trainingLevel`, {headers: this.header});
  }

  getContactid(id: number): Observable<Response<Contact>> {
    return this.httpClient.get<Response<Contact>>(`${this.urlApi}/contacts/${id}`, {headers: this.header});
  }

  getAOC(id: number, page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/business/byCustomer/${id}?page=${page}&size=3`, {headers: this.header});
  }

  getActionsTable(page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/actions/details?page=${page}&size=5`, {headers: this.header});
  }

  getAid(id: number): Observable<Response<BusinessModel>> {
    return this.httpClient.get<Response<BusinessModel>>(`${this.urlApi}/business/details/${id}`, {headers: this.header});
  }

  getCvid(id: number): Observable<Response<CvtModel>> {
    return this.httpClient.get<Response<CvtModel>>(`${this.urlApi}/candidates/details/${id}`, {headers: this.header});
  }

  getCvshortlist(id: number): Observable<Response<Array<CvtModel>>> {
    return this.httpClient.get<Response<Array<CvtModel>>>(`${this.urlApi}/candidates/missionId/${id}`, {headers: this.header});
  }

  getProjectsByIdExperience(id: number): Observable<Response<Array<ProjectsModel>>> {
    return this.httpClient.get<Response<Array<ProjectsModel>>>(`${this.urlApi}/projects/byExperience/${id}`, {headers: this.header});
  }

  getSkillOfCandidate(idC: number, idS: number): Observable<Response<CandidateSkillModel>> {
    return this.httpClient.get<Response<CandidateSkillModel>>(`${this.urlApi}/candidatesSkills/getOne?cId=${idC}&sId=${idS}`, {headers: this.header});
  }

  getSkillOfMission(idM: number, idS: number): Observable<Response<MissionSkillModel>> {
    return this.httpClient.get<Response<MissionSkillModel>>(`${this.urlApi}/missionSkill/getOne?mId=${idM}&sId=${idS}`, {headers: this.header});
  }

  getTagOfCandidate(idC: number, idT: number): Observable<Response<CandidateTagsDetailModel>> {
    return this.httpClient.get<Response<CandidateTagsDetailModel>>(`${this.urlApi}/candidatesTag/getOne?cId=${idC}&tId=${idT}`, {headers: this.header});
  }

  getTagOfMission(idM: number, idT: number): Observable<Response<MissionTagsModel>> {
    return this.httpClient.get<Response<MissionTagsModel>>(`${this.urlApi}/missionTag/getOne?mId=${idM}&tId=${idT}`, {headers: this.header});
  }

  getLanguageOfCandidate(idC: number, idL: number): Observable<Response<CandidateLanguageModel>> {
    return this.httpClient.get<Response<CandidateLanguageModel>>(`${this.urlApi}/candidatesLanguages/getOne?cId=${idC}&lId=${idL}`, {headers: this.header});
  }

  getLanguageOfMission(idM: number, idL: number): Observable<Response<MissionLanguageModel>> {
    return this.httpClient.get<Response<MissionLanguageModel>>(`${this.urlApi}/missionLanguages/getOne?mId=${idM}&lId=${idL}`, {headers: this.header});
  }

  getManagerialOfCandidate(idC: number, idM: number): Observable<Response<CandidateManagerialAbilityModel>> {
    return this.httpClient.get<Response<CandidateManagerialAbilityModel>>(`${this.urlApi}/candidatesManagerialAbilities/getOne?cId=${idC}&mId=${idM}`, {headers: this.header});
  }

  getManagerialOfMission(idM: number, idMb: number): Observable<Response<MissionManagerialAbilityModel>> {
    return this.httpClient.get<Response<MissionManagerialAbilityModel>>(`${this.urlApi}/missionManagerialAbilities/getOne?mId=${idM}&mbId=${idMb}`, {headers: this.header});
  }

  getSid(id: number): Observable<Response<SourcerModel>> {
    return this.httpClient.get<Response<SourcerModel>>(`${this.urlApi}/sourcers/${id}`, {headers: this.header});
  }

  addPartenaire(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/sourcers`, Partenaire, {headers: this.header});
  }

  addCandidateSkill(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/candidatesSkills`, Partenaire, {headers: this.header});
  }

  addMissionSkill(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/missionSkill`, Partenaire, {headers: this.header});
  }

  addCandidateManagerialAbility(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/candidatesManagerialAbilities`, Partenaire, {headers: this.header});
  }

  addMissionManagerialAbility(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/missionManagerialAbilities`, Partenaire, {headers: this.header});
  }

  postCandidateReliability(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/candidatesReliability`, Partenaire, {headers: this.header});
  }

  putCandidateReliability(idT: number, Partenaire: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/test/${idT}`, Partenaire, {headers: this.header});
  }

  addCandidateLanguage(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/candidatesLanguages`, Partenaire, {headers: this.header});
  }

  addMissionLanguage(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/missionLanguages`, Partenaire, {headers: this.header});
  }

  addCandidateCertification(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/certifications`, Partenaire, {headers: this.header});
  }

  addProject(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/projects`, Partenaire, {headers: this.header});
  }

  addCandidateTraining(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/trainings`, Partenaire, {headers: this.header});
  }

  addMissionTraining(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/missionTrainingLevel`, Partenaire, {headers: this.header});
  }

  getCandidateCertificationId(id: number): Observable<Response<CertificationsModel>> {
    return this.httpClient.get<Response<CertificationsModel>>(`${this.urlApi}/certifications/${id}`, {headers: this.header});
  }

  getCandidateTrainingId(id: number): Observable<Response<TrainingsModel>> {
    return this.httpClient.get<Response<TrainingsModel>>(`${this.urlApi}/trainings/${id}`, {headers: this.header});
  }

  getMissionTrainingId(idM: number, idT: number): Observable<Response<TrainingsModel>> {
    return this.httpClient.get<Response<TrainingsModel>>(`${this.urlApi}/missionTrainingLevel/getOne?mId=${idM}&tId=${idT}`, {headers: this.header});
  }

  getExperienceId(id: number): Observable<Response<ExperiencesDetailsModel>> {
    return this.httpClient.get<Response<ExperiencesDetailsModel>>(`${this.urlApi}/experiences/${id}`, {headers: this.header});
  }

  addCandidateTag(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/candidatesTag`, Partenaire, {headers: this.header});
  }

  addMissionTag(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/missionTag`, Partenaire, {headers: this.header});
  }

  addExperience(Partenaire: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/experiences`, Partenaire, {headers: this.header});
  }

  getPartenaire(page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/sourcers/paged-list?page=${page}&size=6`, {headers: this.header});
  }

  editPartenaire(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/sourcers/${id}`, customer, {headers: this.header});
  }

  addBusiness(business: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/business`, business, {headers: this.header});
  }

  addContact(business: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/contacts`, business, {headers: this.header});
  }

  getBusiness(page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<Array<BusinessModel>>>(`${this.urlApi}/business/details?page=${page}&size=6`, {headers: this.header});
  }

  getMissionStatut(): Observable<Response<Array<MissionStatusModel>>> {
    return this.httpClient.get<Response<Array<MissionStatusModel>>>(`${this.urlApi}/missionStatus`, {headers: this.header});
  }

  getBStatut(): Observable<Response<Array<BStatutModel>>> {
    return this.httpClient.get<Response<Array<BStatutModel>>>(`${this.urlApi}/businessStatus`, {headers: this.header});
  }

  getMissionAffaire(page: number, pageSize: number, filter ?: any, sort ?: any, id ?: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(`${this.urlApi}/mission/missOfBis/${id}?page=${page}&size=${pageSize}`,
      {
        filter,
        sort
      }, {headers: this.header});
  }

  getMissionsDetail(id: number): Observable<Response<Mission>> {
    return this.httpClient.get<Response<Mission>>(`${this.urlApi}/mission/details/${id}`, {headers: this.header});
  }

  getMissionSuggest(id: number, page: number, size: number): Observable<Response<any>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/mission/missSugOfBis/${id}?page=${page}&size=${size}`, {headers: this.header});
  }

  editBusiness(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/business/${id}`, customer, {headers: this.header});
  }

  addCvt(cvt: any): Observable<Response<any>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/candidates`, cvt, {headers: this.header});
  }

  getCvt(page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/candidates/paged-list?page=${page}&size=6`, {headers: this.header});
  }

  editCvt(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/candidates/${id}`, customer, {headers: this.header});
  }

  editContact(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/contacts/${id}`, customer, {headers: this.header});
  }

  editSkillOfCandidate(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/candidates/${id}`, customer, {headers: this.header});
  }

  editSkillOfMission(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/mission/${id}`, customer, {headers: this.header});
  }

  getMissionId(id: number): Observable<Response<Mission>> {
    return this.httpClient.get<Response<Mission>>(`${this.urlApi}/mission/details/${id}`, {headers: this.header});
  }

  getShortlistsTable(id: number): Observable<Response<Array<ShortlistModel>>> {
    return this.httpClient.get<Response<Array<ShortlistModel>>>(`${this.urlApi}/shortlists/missionId/${id}`, {headers: this.header});
  }

  getShortlistsSeriesTable(id: number): Observable<Response<Array<ShorlistSeriesModel>>> {
    return this.httpClient.get<Response<Array<ShorlistSeriesModel>>>(`${this.urlApi}/shortlistsSeries/mission/${id}`, {headers: this.header});
  }

  getShortlistType(): Observable<Response<Array<ShortlistTypeModel>>> {
    return this.httpClient.get<Response<Array<ShortlistTypeModel>>>(`${this.urlApi}/Steps`, {headers: this.header});
  }

  editExperience(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/experiences/${id}`, customer, {headers: this.header});
  }

  editCertificationOfCandidate(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/certifications/${id}`, customer, {headers: this.header});
  }

  editProject(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/projects/${id}`, customer, {headers: this.header});
  }

  editTrainingOfCandidate(id: number, customer: any): Observable<Response<any>> {
    return this.httpClient.put<Response<Array<any>>>(`${this.urlApi}/trainings/${id}`, customer, {headers: this.header});
  }

  getDeals(): Observable<Response<Array<DealsCommercial>>> {
    return this.httpClient.get<Response<Array<DealsCommercial>>>(`${this.urlApi}/dealsCommercials`, {headers: this.header});
  }

  getTableCandidatesShortlist(id: number): Observable<Response<Array<CvtModel>>> {
    return this.httpClient.get<Response<Array<CvtModel>>>(`${this.urlApi}/shortlists/candidates/${id}`, {headers: this.header});
  }

  getTableShortlists(id: number): Observable<Response<Array<ShortlistModel>>> {
    return this.httpClient.get<Response<Array<ShortlistModel>>>(`${this.urlApi}/shortlists/detail/series/${id}`, {headers: this.header});
  }

  deleteCvt(id: number) {
    return this.httpClient.delete(`${this.urlApi}/candidates/${id}`, {headers: this.header});
  }

  deleteMission(id: number) {
    return this.httpClient.delete(`${this.urlApi}/mission/${id}`, {headers: this.header});
  }

  deleteSkillCandidate(idC: number, idS: number) {
    return this.httpClient.delete(`${this.urlApi}/candidatesSkills/delete?cId=${idC}&sId=${idS}`, {headers: this.header});
  }

  deleteTestCandidate(body: any) {
    return this.httpClient.post(`${this.urlApi}/candidatesReliability/delete`, body, {headers: this.header});
  }

  addShortList(body: any) {
    return this.httpClient.post(`${this.urlApi}/shortlistsSeries`, body, {headers: this.header});
  }

  deleteSkillMission(idM: number, idS: number) {
    return this.httpClient.delete(`${this.urlApi}/missionSkill/delete?mId=${idM}&sId=${idS}`, {headers: this.header});
  }

  deleteManagerial(idC: number, idM: number) {
    return this.httpClient.delete(`${this.urlApi}/candidatesManagerialAbilities/delete?cId=${idC}&mId=${idM}`, {headers: this.header});
  }

  deleteManagerialOfMission(idM: number, idMb: number) {
    return this.httpClient.delete(`${this.urlApi}/missionManagerialAbilities/delete?mId=${idM}&mbId=${idMb}`, {headers: this.header});
  }

  deleteTag(idC: number, idT: number) {
    return this.httpClient.delete(`${this.urlApi}/candidatesTag/delete?cId=${idC}&tId=${idT}`, {headers: this.header});
  }

  deleteTagMission(idM: number, idT: number) {
    return this.httpClient.delete(`${this.urlApi}/missionTag/delete?mId=${idM}&tId=${idT}`, {headers: this.header});
  }

  deleteLanguage(idC: number, idL: number) {
    return this.httpClient.delete(`${this.urlApi}/candidatesLanguages/delete?cId=${idC}&lId=${idL}`, {headers: this.header});
  }

  deleteLanguageMission(idM: number, idL: number) {
    return this.httpClient.delete(`${this.urlApi}/missionLanguages/delete?mId=${idM}&lId=${idL}`, {headers: this.header});
  }

  deleteCertification(id: number) {
    return this.httpClient.delete(`${this.urlApi}/certifications/${id}`, {headers: this.header});
  }

  deleteTraining(id: number) {
    return this.httpClient.delete(`${this.urlApi}/trainings/${id}`, {headers: this.header});
  }

  deleteTrainingMission(idM: number, idT: number) {
    return this.httpClient.delete(`${this.urlApi}/missionTrainingLevel/delete?mId=${idM}&tId=${idT}`, {headers: this.header});
  }

  deleteExperience(id: number) {
    return this.httpClient.delete(`${this.urlApi}/experiences/${id}`, {headers: this.header});
  }

  deleteProject(id: number) {
    return this.httpClient.delete(`${this.urlApi}/projects/${id}`, {headers: this.header});
  }

  deleteAffaire(id: number) {
    return this.httpClient.delete(`${this.urlApi}/business/${id}`, {headers: this.header});
  }

  deleteCustomer(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/customers/${id}`, {headers: this.header});
  }

  deleteContact(id: number): Observable<Response<Array<any>>> {
    return this.httpClient.delete<Response<Array<any>>>(`${this.urlApi}/contacts/${id}`, {headers: this.header});
  }

  uploadFileCv(file: File): Observable<Response<any>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<Response<any>>(`${this.urlApi}/cvsAttachments/upload`, formData, {headers});
  }

  addDetailCv(body: any) {
    return this.httpClient.post(`${this.urlApi}/cvs`, body, {headers: this.header});
  }

  getDetailCv(id: number, page: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(`${this.urlApi}/cvs/candidate/${id}?page=${page}&size=5`, {headers: this.header});
  }

  getResponsable(res: string): Observable<Response<Array<any>>> {
    return this.httpClient.get<Response<Array<any>>>(`${this.urlApi}/${res}`, {headers: this.header});
  }

  addAction(body): Observable<Response<Array<any>>> {
    return this.httpClient.post<Response<Array<any>>>(`${this.urlApi}/actions`, body, {headers: this.header});
  }
}
