import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MissionsService} from '../../services/missions.service';
import {CompanyModel} from '../../models/company.model';
import {PaysClass} from '../../models/Class/pays.class';
import {SchoolModel} from '../../models/school.model';
import {TagsModel} from '../../models/tags.model';
import {CertificationsModel} from '../../models/certifications.model';
import {DealsCommercial} from '../../models/dealsCommercial';
import {MissionType} from '../../models/missionType';
import {ActionTypes} from '../../models/actionTypes';
import {TrainingLevelModel} from '../../models/trainingLevel.model';
import {MissionStatusModel} from '../../models/missionStatus.model';
import {BStatutModel} from '../../models/bStatut.model';
import {ActionStatus} from '../../models/actionStatus';
import {SkillCategoriesModel} from '../../models/request/skillCategories.model';
import {ManagerialAbilityModel} from '../../models/managerialAbility.model';
import {FieldsOfActivityModel} from '../../models/fieldsOfActivity.model';
import {SkillsModel} from '../../models/skills.model';
import {CertificationDomainsModel} from '../../models/certificationDomains.model';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {LanguageModel} from '../../models/language.model';

@Component({
  selector: 'app-panneau',
  templateUrl: './panneau.component.html',
  styleUrls: ['./panneau.component.scss']
})
export class PanneauComponent implements OnInit {
  itemsPerPage: number;
  numberOfItems: number;
  totalPages: number;
  totalElements: number;
  companies: Array<CompanyModel>;
  company: CompanyModel = new CompanyModel();
  pays: PaysClass = new PaysClass();
  paysSelect: any;
  showCompany: boolean;
  actionCompany: number;
  actionDelete: number;
  modelRef: BsModalRef;
  config = {backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};
  schools: Array<SchoolModel>;
  school: SchoolModel = new SchoolModel();
  showSchool: boolean;
  actionSchool: number;
  tags: Array<TagsModel>;
  tag: TagsModel = new TagsModel();
  showTag: boolean;
  actionTag: number;
  certifications: Array<CertificationDomainsModel>;
  certification: CertificationDomainsModel = new CertificationDomainsModel();
  showCertification: boolean;
  actionCertification: number;
  deals: Array<DealsCommercial>;
  deal: DealsCommercial = new DealsCommercial();
  showDeal: boolean;
  actionDeal: number;
  typeMissions: Array<MissionType>;
  typeMission: MissionType = new MissionType();
  actionTypeMission: number;
  showTypeMission: boolean;
  typeActions: Array<ActionTypes>;
  typeAction: ActionTypes = new ActionTypes();
  actionTypeAction: number;
  showTypeAction: boolean;
  trainingLevels: Array<TrainingLevelModel>;
  trainingLevel: TrainingLevelModel = new TrainingLevelModel();
  showTrainingLevel: boolean;
  actionTrainingLevel: number;
  missionStatus: Array<MissionStatusModel>;
  missionStatu: MissionStatusModel = new MissionStatusModel();
  actionMissionStatu: number;
  showMissionStatu: boolean;
  affaireStatus: Array<BStatutModel>;
  affaireStatu: BStatutModel = new BStatutModel();
  actionAffaireStatu: number;
  showAffaireStatu: boolean;
  actionStatus: Array<ActionStatus>;
  actionStatu: ActionStatus = new ActionStatus();
  actionActionStatu: number;
  showActionStatu: boolean;
  skillCategories: Array<SkillCategoriesModel>;
  skillCategory: SkillCategoriesModel = new SkillCategoriesModel();
  showSkillCategory: boolean;
  actionSkillCategory: number;
  managerialAbilities: Array<ManagerialAbilityModel>;
  managerialAbility: ManagerialAbilityModel = new ManagerialAbilityModel();
  actionManagerialAbility: number;
  showManagerialAbility: boolean;
  managAbilities: Array<ManagerialAbilityModel>;
  managAbility: ManagerialAbilityModel = new ManagerialAbilityModel();
  actionManagAbility: number;
  showManagAbility: boolean;
  filedActivities: Array<FieldsOfActivityModel>;
  filedActivity: FieldsOfActivityModel = new FieldsOfActivityModel();
  actionFieldActivity: number;
  showFieldActivity: boolean;
  skills: Array<SkillsModel>;
  skill: SkillsModel = new SkillsModel();
  actionSkill: number;
  showSkill: boolean;
  page: number = 1;
  dropdownSettings: IDropdownSettings;
  shortlistSelect: Array<any> = [];
  div1: boolean = true;
  div2: boolean = true;
  div3: boolean = false;
  div4: boolean = false;
  div5: boolean = false;
  div6: boolean = false;
  div7: boolean = false;
  div8: boolean = false;
  div9: boolean = false;
  div10: boolean = false;
  div11: boolean = false;
  div12: boolean = false;
  div13: boolean = false;
  div14: boolean = false;
  div15: boolean = false;
  div16: boolean = false;
  div17: boolean = false;
  selectedItems = [];
  languages: Array<LanguageModel>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private location: Location,
              private modelService: BsModalService,
              private serviceM: MissionsService) {
  }

  ngOnInit() {

    this.shortlistSelect.push({id: 1, name: 'Entreprises'}, {id: 2, name: 'Écoles & Universités'}, {id: 3, name: ' Tags'}, {
      id: 4,
      name: ' Domaines de certification'
    }, {
      id: 5, name: ' Deals commercial'
    }, {id: 6, name: ' Types de mission'}, {id: 7, name: ' Types d\'action'}, {id: 8, name: ' Niveaux de formation'}, {
      id: 9,
      name: ' Statuts de mission'
    }, {
      id: 10, name: ' Statuts d\'affaire'
    }, {id: 11, name: ' Statuts de action'}, {id: 12, name: ' Categories de compétence'}, {
      id: 13,
      name: ' Categories de capacités managerielles'
    }, {id: 14, name: ' Langues'}, {
      id: 15, name: ' Capacités managerielles'
    }, {id: 16, name: ' Compétences'}, {id: 17, name: 'Domaines d\'activté'});
    console.log(this.shortlistSelect);
    this.selectedItems = [
      {id: 1, name: 'Entreprises'},
      {id: 2, name: 'Écoles & Universités'}
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 0,
      allowSearchFilter: false,
      searchPlaceholderText: 'Pour Rechercher .....',
      clearSearchFilter: false,
      enableCheckAll: true
    };

    this.serviceM.getCompanies().subscribe(response => {
      this.companies = response.data;
    });
    this.serviceM.getSchools().subscribe(response => {
      this.schools = response.data;
    });
    this.serviceM.getTags().subscribe(response => {
      this.tags = response.data;
    });
    this.serviceM.getLanguages().subscribe(response => {
      this.languages = response.data;
    });
    this.serviceM.getCertificationsDomaine().subscribe(response => {
      this.certifications = response.data;
    });
    this.serviceM.getDeals().subscribe(response => {
      this.deals = response.data;
    });
    this.serviceM.getMissionType().subscribe(response => {
      this.typeMissions = response.data;
    });
    this.serviceM.getTypeActions().subscribe(response => {
      this.typeActions = response.data;
    });
    this.serviceM.getTrainingLevels().subscribe(response => {
      this.trainingLevels = response.data;
    });
    this.serviceM.getMissionStatus().subscribe(response => {
      this.missionStatus = response.data;
    });
    this.serviceM.getAffaireStatus().subscribe(response => {
      this.affaireStatus = response.data;
    });
    this.serviceM.getActionStatus().subscribe(response => {
      this.actionStatus = response.data;
    });
    this.serviceM.getSkillCategories().subscribe(response => {
      this.skillCategories = response.data;
    });
    this.serviceM.getManagerialAbilities().subscribe(response => {
      this.managerialAbilities = response.data;
    });
    this.serviceM.getManagAbilities().subscribe(response => {
      this.managAbilities = response.data;
    });
    this.serviceM.getFieldOfActivity().subscribe(response => {
      this.filedActivities = response.data;
    });
    this.listSkillTable();
    this.paysSelect = this.pays.x;
    this.company.companyCountry = 'selectionner ....';
    this.school.schoolCountry = 'selectionner ....';
    this.skill.skillCategoryId = 0;
    this.managAbility.managAbilCategoryId = 0;
  }

  addCompany() {
    this.serviceM.addCompany(this.company).subscribe(response => {
      this.serviceM.getCompanies().subscribe(response => {
        this.companies = response.data;
      });
      this.toastrService.success('Entreprise Ajouté', 'Entreprise');
    });
  }

  onItemSelect(item: any) {
    if (item.id == 1) {
      this.div1 = true;
    } else if (item.id == 2) {
      this.div2 = true;
    } else if (item.id == 3) {
      this.div3 = true;
    } else if (item.id == 4) {
      this.div4 = true;
    } else if (item.id == 5) {
      this.div5 = true;
    } else if (item.id == 6) {
      this.div6 = true;
    } else if (item.id == 7) {
      this.div7 = true;
    } else if (item.id == 8) {
      this.div8 = true;
    } else if (item.id == 9) {
      this.div9 = true;
    } else if (item.id == 10) {
      this.div10 = true;
    } else if (item.id == 11) {
      this.div11 = true;
    } else if (item.id == 12) {
      this.div12 = true;
    } else if (item.id == 13) {
      this.div13 = true;
    } else if (item.id == 14) {
      this.div14 = true;
    } else if (item.id == 15) {
      this.div15 = true;
    } else if (item.id == 16) {
      this.div16 = true;
    } else if (item.id == 17) {
      this.div17 = true;
    }
  }

  onItemDeselect(item: any) {
    if (item.id == 1) {
      this.div1 = false;
    } else if (item.id == 2) {
      this.div2 = false;
    } else if (item.id == 3) {
      this.div3 = false;
    } else if (item.id == 4) {
      this.div4 = false;
    } else if (item.id == 5) {
      this.div5 = false;
    } else if (item.id == 6) {
      this.div6 = false;
    } else if (item.id == 7) {
      this.div7 = false;
    } else if (item.id == 8) {
      this.div8 = false;
    } else if (item.id == 9) {
      this.div9 = false;
    } else if (item.id == 10) {
      this.div10 = false;
    } else if (item.id == 11) {
      this.div11 = false;
    } else if (item.id == 12) {
      this.div12 = false;
    } else if (item.id == 13) {
      this.div13 = false;
    } else if (item.id == 14) {
      this.div14 = false;
    } else if (item.id == 15) {
      this.div15 = false;
    } else if (item.id == 16) {
      this.div16 = false;
    } else if (item.id == 17) {
      this.div17 = false;
    }
  }

  addSchool() {
    this.serviceM.addSchool(this.school).subscribe(response => {
      this.serviceM.getSchools().subscribe(response => {
        this.schools = response.data;
      });
      this.toastrService.success('Ecole Ajouté', 'Ecole');
    });
  }

  addTag() {
    this.serviceM.addTag(this.tag).subscribe(response => {
      this.serviceM.getTags().subscribe(response => {
        this.tags = response.data;
      });
      this.toastrService.success('Tag Ajouté', 'Tag');
    });
  }

  addCertification() {
    this.serviceM.addCertificationDomain(this.certification).subscribe(response => {
      this.serviceM.getCertificationsDomaine().subscribe(response => {
        this.certifications = response.data;
      });
      this.toastrService.success('Certification Ajouté', 'Certification');
    });
  }

  addTypeMission() {
    this.serviceM.addTypeMission(this.typeMission).subscribe(response => {
      this.serviceM.getMissionType().subscribe(response => {
        this.typeMissions = response.data;
      });
      this.toastrService.success('Type De Mission Ajouté', 'Type De Mission');
    });
  }

  addTypeAction() {
    this.serviceM.addTypeAction(this.typeAction).subscribe(response => {
      this.serviceM.getTypeActions().subscribe(response => {
        this.typeActions = response.data;
      });
      this.toastrService.success('Type D\'action Ajouté', 'Type D\'action');
    });
  }

  addTrainingLevel() {
    this.serviceM.addTrainingLevel(this.trainingLevel).subscribe(response => {
      this.serviceM.getTrainingLevels().subscribe(response => {
        this.trainingLevels = response.data;
      });
      this.toastrService.success('Le Niveau de Formation Ajouté', 'Le Niveau de Formation');
    });
  }

  addMissionStatu() {
    this.serviceM.addMissionStatu(this.missionStatu).subscribe(response => {
      this.serviceM.getMissionStatus().subscribe(response => {
        this.missionStatus = response.data;
      });
      this.toastrService.success('Statut De Mission Ajouté', 'Statut De Mission');
    });
  }

  addAffaireStatu() {
    this.serviceM.addAffaireStatu(this.affaireStatu).subscribe(response => {
      this.serviceM.getAffaireStatus().subscribe(response => {
        this.affaireStatus = response.data;
      });
      this.toastrService.success('Statut D\'affaire Ajouté', 'Statut D\'affaire');
    });
  }

  addSkillCategory() {
    this.serviceM.addSkillCategory(this.skillCategory).subscribe(response => {
      this.serviceM.getSkillCategories().subscribe(response => {
        this.skillCategories = response.data;
      });
      this.toastrService.success('Statut D\'affaire Ajouté', 'Statut D\'affaire');
    });
  }

  addManagerialAbility() {
    this.serviceM.addManagerialAbility(this.managerialAbility).subscribe(response => {
      this.serviceM.getManagerialAbilities().subscribe(response => {
        this.managerialAbilities = response.data;
      });
      this.toastrService.success('Statut D\'affaire Ajouté', 'Statut D\'affaire');
    });
  }

  addManagAbility() {
    this.managAbility.managAbilCategoryId = Number(this.managAbility.managAbilCategoryId);
    this.serviceM.addManagAbility(this.managAbility).subscribe(response => {
      this.serviceM.getManagAbilities().subscribe(response => {
        this.managAbilities = response.data;
      });
      this.toastrService.success('Statut D\'affaire Ajouté', 'Statut D\'affaire');
    });
  }

  addFieldActivity() {
    this.serviceM.addFieldActivity(this.filedActivity).subscribe(response => {
      this.serviceM.getFieldOfActivity().subscribe(response => {
        this.filedActivities = response.data;
      });
      this.toastrService.success('Statut D\'affaire Ajouté', 'Statut D\'affaire');
    });
  }

  addSkill() {
    this.skill.skillCategoryId = Number(this.skill.skillCategoryId);
    this.serviceM.addSkill(this.skill).subscribe(response => {
      this.listSkillTable();
      this.toastrService.success('Statut D\'affaire Ajouté', 'Statut D\'affaire');
    });
  }

  addActionStatu() {
    this.serviceM.addActionStatu(this.actionStatu).subscribe(response => {
      this.serviceM.getActionStatus().subscribe(response => {
        this.actionStatus = response.data;
      });
      this.toastrService.success('Statut D\'affaire Ajouté', 'Statut D\'affaire');
    });
  }

  addDeal() {
    this.serviceM.addDeal(this.deal).subscribe(response => {
      this.serviceM.getDeals().subscribe(response => {
        this.deals = response.data;
      });
      this.toastrService.success('Deal Commercial Ajouté', 'Deal Commercial');
    });
  }

  editCompany() {
    this.serviceM.editCompany(this.company.id, this.company).subscribe(response => {
      this.serviceM.getCompanies().subscribe(response => {
        this.companies = response.data;
      });
      this.toastrService.success('Entreprise Modifié', 'Entreprise');
    });
  }

  editSchool() {
    this.serviceM.editSchool(this.school.id, this.school).subscribe(response => {
      this.serviceM.getSchools().subscribe(response => {
        this.schools = response.data;
      });
      this.toastrService.success('Ecole Modifié', 'Ecole');
    });
  }

  editTag() {
    this.serviceM.editTag(this.tag.id, this.tag).subscribe(response => {
      this.serviceM.getTags().subscribe(response => {
        this.tags = response.data;
      });
      this.toastrService.success('Tag Modifié', 'Tag');
    });
  }

  editCertification() {
    this.serviceM.editCertificationDomain(this.certification.id, this.certification).subscribe(response => {
      this.serviceM.getCertificationsDomaine().subscribe(response => {
        this.certifications = response.data;
      });
      this.toastrService.success('Certification Modifié', 'Certification');
    });
  }

  editTypeMission() {
    this.serviceM.editTypeMission(this.certification.id, this.certification).subscribe(response => {
      this.serviceM.getMissionType().subscribe(response => {
        this.typeMissions = response.data;
      });
      this.toastrService.success('Type De Mission Modifié', 'Type De Mission');
    });
  }

  editTypeAction() {
    this.serviceM.editTypeAction(this.typeAction.id, this.typeAction).subscribe(response => {
      this.serviceM.getTypeActions().subscribe(response => {
        this.typeActions = response.data;
      });
      this.toastrService.success('Type D\'action Modifié', 'Type D\'action');
    });
  }

  editTrainingLevel() {
    this.serviceM.editTrainingLevel(this.trainingLevel.id, this.trainingLevel).subscribe(response => {
      this.serviceM.getTrainingLevels().subscribe(response => {
        this.trainingLevels = response.data;
      });
      this.toastrService.success('Le Niveau de Formation Modifié', 'Le Niveau de Formation');
    });
  }

  editMissionStatu() {
    this.serviceM.editMissionStatu(this.missionStatu.id, this.missionStatu).subscribe(response => {
      this.serviceM.getMissionStatus().subscribe(response => {
        this.missionStatus = response.data;
      });
      this.toastrService.success('Statut De Mission Modifié', 'Statut De Mission');
    });
  }

  editAffaireStatu() {
    this.serviceM.editAffaireStatu(this.affaireStatu.id, this.affaireStatu).subscribe(response => {
      this.serviceM.getAffaireStatus().subscribe(response => {
        this.affaireStatus = response.data;
      });
      this.toastrService.success('Statut D\'affaire Modifié', 'Statut D\'affaire');
    });
  }

  editSkillCategory() {
    this.serviceM.editAffaireStatu(this.affaireStatu.id, this.affaireStatu).subscribe(response => {
      this.serviceM.getAffaireStatus().subscribe(response => {
        this.affaireStatus = response.data;
      });
      this.toastrService.success('Statut D\'affaire Modifié', 'Statut D\'affaire');
    });
  }

  editManagerialAbility() {
    this.serviceM.editManagerialAbility(this.managerialAbility.id, this.managerialAbility).subscribe(response => {
      this.serviceM.getManagerialAbilities().subscribe(response => {
        this.managerialAbilities = response.data;
      });
      this.toastrService.success('Statut D\'affaire Modifié', 'Statut D\'affaire');
    });
  }

  editManagAbility() {
    this.serviceM.editManagAbility(this.managAbility.id, this.managAbility).subscribe(response => {
      this.serviceM.getManagAbilities().subscribe(response => {
        this.managAbilities = response.data;
      });
      this.toastrService.success('Statut D\'affaire Modifié', 'Statut D\'affaire');
    });
  }

  editFieldActivity() {
    this.serviceM.editFieldActivity(this.filedActivity.id, this.filedActivity).subscribe(response => {
      this.serviceM.getFieldOfActivity().subscribe(response => {
        this.filedActivities = response.data;
      });
      this.toastrService.success('Statut D\'affaire Modifié', 'Statut D\'affaire');
    });
  }

  editSkill() {
    this.serviceM.editSkill(this.skill.id, this.skill).subscribe(response => {
      this.listSkillTable();
      this.toastrService.success('Statut D\'affaire Modifié', 'Statut D\'affaire');
    });
  }

  editActionStatu() {
    this.serviceM.editActionStatu(this.actionStatu.id, this.actionStatu).subscribe(response => {
      this.serviceM.getActionStatus().subscribe(response => {
        this.actionStatus = response.data;
      });
      this.toastrService.success('Statut D\'affaire Modifié', 'Statut D\'affaire');
    });
  }

  editDeal() {
    this.serviceM.editDeal(this.deal.id, this.deal).subscribe(response => {
      this.serviceM.getDeals().subscribe(response => {
        this.deals = response.data;
      });
      this.toastrService.success('Deal Commercial Modifié', 'Deal Commercial');
    });
  }

  clearCompany() {
    this.company.companyCountry = 'selectionner ....';
    this.company.companyAddress = '';
    this.company.companyCity = '';
    this.company.companyName = '';
    this.serviceM.getCompanies().subscribe(response => {
      this.companies = response.data;
    });
  }

  clearMissionStatu() {
    this.missionStatu.missionStatusTitle = '';
    this.serviceM.getMissionStatus().subscribe(response => {
      this.missionStatus = response.data;
    });
  }

  listSkillTable() {
    this.serviceM.getSkillsTable(this.page).subscribe(response => {
      this.skills = response.data['content'];
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    });
  }

  clearSkill() {
    this.skill.skillTitle = '';
    this.listSkillTable();
  }

  clearFieldActivity() {
    this.filedActivity.fieldOfActivityTitle = '';
    this.serviceM.getFieldOfActivity().subscribe(response => {
      this.filedActivities = response.data;
    });
  }

  clearManagerialAbility() {
    this.managerialAbility.managerialAbilityCategoryTitle = '';
    this.serviceM.getManagerialAbilities().subscribe(response => {
      this.managerialAbilities = response.data;
    });
  }

  clearManagAbility() {
    this.managAbility.managerialAbilityTitle = '';
    this.serviceM.getManagAbilities().subscribe(response => {
      this.managAbilities = response.data;
    });
  }

  clearSkillCategory() {
    this.skillCategory.skillCategoryTitle = '';
    this.serviceM.getSkillCategories().subscribe(response => {
      this.skillCategories = response.data;
    });
  }

  clearActionStatu() {
    this.affaireStatu.businessStatusTitle = '';
    this.serviceM.getActionStatus().subscribe(response => {
      this.actionStatus = response.data;
    });
  }

  clearAffaireStatu() {
    this.affaireStatu.businessStatusTitle = '';
    this.serviceM.getAffaireStatus().subscribe(response => {
      this.affaireStatus = response.data;
    });
  }

  clearTrainingLevel() {
    this.trainingLevel.trainingLevelTitle = '';
    this.serviceM.getTrainingLevels().subscribe(response => {
      this.trainingLevels = response.data;
    });
  }

  clearTypeAction() {
    this.typeAction.actionTypeTitle = '';
    this.serviceM.getTypeActions().subscribe(response => {
      this.typeActions = response.data;
    });
  }

  clearTypeMission() {
    this.typeMission.missionTypeTitle = '';
    this.serviceM.getMissionType().subscribe(response => {
      this.typeMissions = response.data;
    });
  }

  clearCertification() {
    this.certification.certificationDomainTitle = '';
    this.serviceM.getCertificationsDomaine().subscribe(response => {
      this.certifications = response.data;
    });
  }

  clearTag() {
    this.tag.tagTitle = '';
    this.serviceM.getTags().subscribe(response => {
      this.tags = response.data;
    });
  }

  clearSchool() {
    this.school.schoolCountry = 'selectionner ....';
    this.school.schoolAddress = '';
    this.school.schoolCity = '';
    this.school.schoolName = '';
    this.serviceM.getSchools().subscribe(response => {
      this.schools = response.data;
    });
  }

  clearDeal() {
    this.deal.dealComercialComment = '';
    this.deal.unit = '';
    this.deal.value = '';
    this.deal.dealCommercialTitle = '';
    this.serviceM.getDeals().subscribe(response => {
      this.deals = response.data;
    });
  }

  showPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }

  delete() {
    if (this.actionDelete === 1) {
      this.serviceM.deleteCompany(this.company.id).subscribe(response => {
        this.toastrService.success('Entreprise Supprimé', 'Entreprise');
        this.serviceM.getCompanies().subscribe(response => {
          this.companies = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette entreprise', 'Imposible');

        }
      });
    } else if (this.actionDelete === 2) {
      this.serviceM.deleteSchool(this.school.id).subscribe(response => {
        this.toastrService.success('Ecole Supprimé', 'Ecole');
        this.serviceM.getSchools().subscribe(response => {
          this.schools = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Ecole', 'Imposible');

        }
      });
    } else if (this.actionDelete === 3) {
      this.serviceM.deleteTag(this.tag.id).subscribe(response => {
        this.toastrService.success('Tag Supprimé', 'Tag');
        this.serviceM.getTags().subscribe(response => {
          this.tags = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Tag', 'Imposible');

        }
      });
    } else if (this.actionDelete === 4) {
      this.serviceM.deleteCertificationDomain(this.certification.id).subscribe(response => {
        this.toastrService.success('Certification Supprimé', 'Certification');
        this.serviceM.getCertificationsDomaine().subscribe(response => {
          this.certifications = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Certification', 'Imposible');

        }
      });
    } else if (this.actionDelete === 5) {
      this.serviceM.deleteTypeMission(this.typeMission.id).subscribe(response => {
        this.toastrService.success('Type De Mission Supprimé', 'Type De Mission');
        this.serviceM.getMissionType().subscribe(response => {
          this.typeMissions = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Type De Mission', 'Imposible');

        }
      });
    } else if (this.actionDelete === 6) {
      this.serviceM.deleteTypeAction(this.typeAction.id).subscribe(response => {
        this.toastrService.success('Type D\'action Supprimé', 'Type D\'action');
        this.serviceM.getTypeActions().subscribe(response => {
          this.typeActions = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Type D\'action', 'Imposible');

        }
      });
    } else if (this.actionDelete === 7) {
      this.serviceM.deleteTrainingLevel(this.trainingLevel.id).subscribe(response => {
        this.toastrService.success('Le Niveau de Formation Supprimé', 'Le Niveau de Formation');
        this.serviceM.getTrainingLevels().subscribe(response => {
          this.trainingLevels = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Le Niveau de Formation', 'Imposible');

        }
      });
    } else if (this.actionDelete === 8) {
      this.serviceM.deleteMissionStatu(this.missionStatu.id).subscribe(response => {
        this.toastrService.success('Statut De Mission Supprimé', 'Statut De Mission');
        this.serviceM.getMissionStatus().subscribe(response => {
          this.missionStatus = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Statut De Mission', 'Imposible');

        }
      });
    } else if (this.actionDelete === 9) {
      this.serviceM.deleteAffaireStatu(this.affaireStatu.id).subscribe(response => {
        this.toastrService.success('Statut D\'affaire Supprimé', 'Statut D\'affaire');
        this.serviceM.getAffaireStatus().subscribe(response => {
          this.affaireStatus = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Statut D\'affaire', 'Imposible');

        }
      });
    } else if (this.actionDelete === 10) {
      this.serviceM.deleteActionStatu(this.actionStatu.id).subscribe(error1 => {
        this.toastrService.success('Statut D\'affaire Supprimé', 'Statut D\'affaire');
        this.serviceM.getActionStatus().subscribe(response => {
          this.actionStatus = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Statut D\'affaire', 'Imposible');
        }
      });
    } else if (this.actionDelete === 11) {
      this.serviceM.deleteSkillCategory(this.skillCategory.id).subscribe(response => {
        this.toastrService.success('Statut D\'affaire Supprimé', 'Statut D\'affaire');
        this.serviceM.getSkillCategories().subscribe(response => {
          this.skillCategories = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Statut D\'affaire', 'Imposible');

        }
      });
    } else if (this.actionDelete === 12) {
      this.serviceM.deleteManagerialAbility(this.managerialAbility.id).subscribe(response => {
        this.toastrService.success('Statut D\'affaire Supprimé', 'Statut D\'affaire');
        this.serviceM.getManagerialAbilities().subscribe(response => {
          this.managerialAbilities = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Statut D\'affaire', 'Imposible');

        }
      });
    } else if (this.actionDelete === 13) {
      this.serviceM.deleteManagAbility(this.managAbility.id).subscribe(response => {
        this.toastrService.success('Statut D\'affaire Supprimé', 'Statut D\'affaire');
        this.serviceM.getManagAbilities().subscribe(response => {
          this.managAbilities = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Statut D\'affaire', 'Imposible');

        }
      });
    } else if (this.actionDelete === 14) {
      this.serviceM.deleteFieldActivity(this.filedActivity.id).subscribe(response => {
        this.toastrService.success('Statut D\'affaire Supprimé', 'Statut D\'affaire');
        this.serviceM.getFieldOfActivity().subscribe(response => {
          this.filedActivities = response.data;
        });
      }, error1 => {
        if (error1.status === 403) {
          this.toastrService.error('Vous ne pouvez pas supprimer cette Statut D\'affaire', 'Imposible');

        }
      });
    }
  }

  pageChanged(page: number): void {
    this.page = page;
    this.listSkillTable();
  }

  onSelectAll() {
    this.div1 = true;
    this.div2 = true;
    this.div3 = true;
    this.div4 = true;
    this.div5 = true;
    this.div6 = true;
    this.div7 = true;
    this.div8 = true;
    this.div9 = true;
    this.div10 = true;
    this.div11 = true;
    this.div12 = true;
    this.div13 = true;
    this.div14 = true;
    this.div15 = true;
    this.div16 = true;
    this.div17 = true;
  }

  onItemDeselectAll() {
    this.div1 = false;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
    this.div5 = false;
    this.div6 = false;
    this.div7 = false;
    this.div8 = false;
    this.div9 = false;
    this.div10 = false;
    this.div11 = false;
    this.div12 = false;
    this.div13 = false;
    this.div14 = false;
    this.div15 = false;
    this.div16 = false;
    this.div17 = false;
  }
}
