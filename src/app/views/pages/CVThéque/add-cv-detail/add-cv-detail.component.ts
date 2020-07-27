import {Component, OnInit, TemplateRef, ElementRef, ViewChild} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {SkillsModel} from '../../../models/skills.model';
import {SkillCategoriesModel} from '../../../models/request/skillCategories.model';
import {CandidateSkillModel} from '../../../models/candidateSkill.model';
import {CvtModel} from '../../../models/cvt.model';
import {ManagerialAbilityModel} from '../../../models/managerialAbility.model';
import {ManagerialCategoryModel} from '../../../models/managerialCategory.model';
import {CandidateManagerialAbilityModel} from '../../../models/candidateManagerialAbility.model';
import {TagsModel} from '../../../models/tags.model';
import {CandidateTagsDetailModel} from '../../../models/candidateTagsDetail.model';
import {LanguageModel} from '../../../models/language.model';
import {CandidateLanguageModel} from '../../../models/candidateLanguage.model';
import {CertificationDomainsModel} from '../../../models/certificationDomains.model';
import {CertificationsModel} from '../../../models/certifications.model';
import {SchoolModel} from '../../../models/school.model';
import {TrainingLevelModel} from '../../../models/trainingLevel.model';
import {TrainingsModel} from '../../../models/trainings.model';
import {ProjectsModel} from '../../../models/projects.model';
import {CompanyModel} from '../../../models/company.model';
import {ExperiencesDetailsModel} from '../../../models/experiencesDetails.model';
import {TestModel} from '../../../models/test.model';
import {CandidatesRealibilityModel} from '../../../models/candidatesRealibility.model';
import {takeWhile} from 'rxjs/operators';
import {interval} from 'rxjs';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-add-cv-detail',
  templateUrl: './add-cv-detail.component.html',
  styleUrls: ['./add-cv-detail.component.scss']
})

export class AddCvDetailComponent implements OnInit {
  cvsTable: Array<any>;
  modelRef3: BsModalRef;
  modelRef2: BsModalRef;
  idProject: number;
  idExperience: number;
  companies: CompanyModel[];
  formExperience;
  formProject;
  idTraining: number;
  trainingLevel: TrainingLevelModel[];
  schools: Array<SchoolModel>;
  idCertification = 1;
  certificationDomains: Array<CertificationDomainsModel>;
  certification: CertificationsModel;
  languageName: string;
  languageFlag: string;
  idCandidateLanguage: number;
  config = {backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};
  config2 = {backdrop: true, ignoreBackdropClick: true, class: 'modal-lg'};
  id: number;
  menu: number;
  actionAE: number;
  page: number;
  idCandidateSkill: number;
  iconSkill: string;
  skills: Array<SkillsModel>;
  managerials: Array<ManagerialCategoryModel>;
  skill: CandidateSkillModel;
  managerial: CandidateManagerialAbilityModel;
  candidate: CvtModel = new CvtModel();
  skillCategories: Array<SkillCategoriesModel>;
  testType: Array<TestModel>;
  managerialAbilities: Array<ManagerialAbilityModel>;
  modelRef: BsModalRef;
  formCandidateSkill;
  formManagerial;
  formLanguage;
  deleteIndex: number;
  idSkill: number;
  idManagerial: number;
  formTag;
  formTagPop;
  tags: Array<TagsModel>;
  idTag: number;
  candidateTag: CandidateTagsDetailModel;
  candidateLanguage: CandidateLanguageModel;
  languages: Array<LanguageModel>;
  formCertification;
  training: TrainingsModel;
  projects: ProjectsModel[];
  candidatesRealiability: Array<CandidatesRealibilityModel>;
  reliability: CandidatesRealibilityModel;
  project: ProjectsModel;
  formTraining;
  experienceDetails: ExperiencesDetailsModel;
  tagName: string;
  formCandidateSkill2;
  formCandidateSkill3;
  testName: string;
  idTest: number;
  selectedFile: ImageSnippet;
  languageCv: string = 'Francais';
  versionCv: string = 'Standard';
  progress: number = 25;
  pages = 1;
  pageSize = 5;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  showPages = false;

  constructor(private customerService: ProfileService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private modelService: BsModalService,
              private element: ElementRef) {
    this.formCandidateSkill = this.formBuilder.group({
      note: ['', Validators.required],
      experience: ['', Validators.required],
      commentaire: ['', Validators.required]
    });
    this.formCandidateSkill2 = this.formBuilder.group({
      note: ['', Validators.required],
      test: ['', Validators.required],
    });
    this.formCandidateSkill3 = this.formBuilder.group({
      note: ['', Validators.required]
    });
    this.formLanguage = this.formBuilder.group({
      niveau: ['', Validators.required],
      etrangere: [false, Validators.required],
      communication: ['', Validators.required],
      lecture: ['', Validators.required],
      ecriture: ['', Validators.required]
    });
    this.formCertification = this.formBuilder.group({
      titre: ['', Validators.required],
      date: [false, Validators.required],
      domaine: ['', Validators.required],
      fournisseur: ['', Validators.required],
      note: ['', Validators.required]
    });
    this.formTraining = this.formBuilder.group({
      titre: ['', Validators.required],
      start: [false, Validators.required],
      end: ['', Validators.required],
      ecole: ['', Validators.required],
      niveau: ['', Validators.required]
    });
    this.formManagerial = this.formBuilder.group({
      note: ['', Validators.required],
      fiabilite: ['', Validators.required],
    });
    this.formTag = this.formBuilder.group({
      tag: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
    this.formTagPop = this.formBuilder.group({
      commentaire: ['', Validators.required]
    });
    this.formExperience = this.formBuilder.group({
      titre: ['', Validators.required],
      entreprise: [false, Validators.required],
      from: ['', Validators.required],
      descreption: ['', Validators.required],
      lieu: ['', Validators.required],
      to: ['', Validators.required]
    });
    this.formProject = this.formBuilder.group({
      titre: ['', Validators.required],
      role: [false, Validators.required],
      tache: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    this.customerService.getSkillCategory().subscribe(response => {
      this.skillCategories = response.data;
    });
    this.customerService.getTestNames().subscribe(response => {
      this.testType = response.data;
    });
    this.customerService.getCvid(this.id).subscribe(respo => {
      this.candidate = respo.data;
    });
    this.menu = Number(localStorage.getItem('menu'));
    this.customerService.getManagerialAbility().subscribe(response => {
      this.managerialAbilities = response.data;
    });
    this.customerService.getTags().subscribe(response => {
      this.tags = response.data;
    });
    this.customerService.getLanguages().subscribe(response => {
      this.languages = response.data;
    });
    this.customerService.getCertificationDomains().subscribe(response => {
      this.certificationDomains = response.data;
    });
    this.customerService.getSchools().subscribe(response => {
      this.schools = response.data;
    });
    this.customerService.getCompanies().subscribe(response => {
      this.companies = response.data;
    });
    this.customerService.getTrainingLevel().subscribe(response => {
      this.trainingLevel = response.data;
    });
    this.listDetailCvTable();
    this.iconSkill = 'fab fa-java';
    this.actionAE = 1;
  }

  listDetailCvTable() {
    this.customerService.getDetailCv(this.id, this.pages).subscribe(response => {
      if (response) {
        this.cvsTable = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.itemsPerPage = response.data.size;
        this.numberOfItems = response.data.numberOfElements;
        this.showPages = true;
      } else {
        this.showPages = false;
      }
    });
  }

  pageChanged(page: number): void {
    this.pages = page;
    this.listDetailCvTable();
  }

  changeA(n: number) {
    this.menu = n;
    this.changeActionAE(1);
  }

  localstorageSuivant(): boolean {
    return localStorage.getItem('suivant active') === '1';
  }

  changeIdCandidateSkill(n: number) {
    this.idCandidateSkill = Number(n);
  }

  changeProjectTable(projects: ProjectsModel[]) {
    this.projects = projects;
  }

  changeProjectFillin(project: ProjectsModel) {
    this.project = project;
  }

  changeRealibilityFillin(project: CandidatesRealibilityModel) {
    this.reliability = project;
  }

  changeIdCandidateLanguage(n: number) {
    this.idCandidateLanguage = Number(n);
  }

  changeIdTraining(n: number) {
    this.idTraining = Number(n);
  }

  changeDeleteIndex(n: number) {
    this.deleteIndex = n;
  }

  fillinSkill() {
    this.customerService.getSkillOfCandidate(this.id, this.idSkill).subscribe(response => {
      this.skill = response.data;
      this.formCandidateSkill.controls.note.setValue(this.skill.candidateSkillGrade);
      this.formCandidateSkill.controls.experience.setValue(this.skill.candidateSkillExperience);
      this.formCandidateSkill.controls.commentaire.setValue(this.skill.candidateSkillComment);
    });
  }

  fillinProject() {
    this.formProject.controls.titre.setValue(this.project.projectTitle);
    this.formProject.controls.role.setValue(this.project.roles);
    this.formProject.controls.tache.setValue(this.project.tasks);
    this.formProject.controls.from.setValue(this.project.projectStartDate);
    this.formProject.controls.to.setValue(this.project.projectEndDate);
  }

  fillinReliability(text, n: number, id: number) {
    this.formCandidateSkill3.controls.note.setValue(Number(n));
    this.testName = text;
    this.idTest = id;
  }

  clearFormProject() {
    this.formProject.controls.titre.setValue('');
    this.formProject.controls.role.setValue('');
    this.formProject.controls.tache.setValue('');
    this.formProject.controls.from.setValue('');
    this.formProject.controls.to.setValue('');
  }

  fillinManagerial() {
    this.customerService.getManagerialOfCandidate(this.id, this.idManagerial).subscribe(response => {
      this.managerial = response.data;
      this.formManagerial.controls.note.setValue(this.managerial.candidatesManagerialAbilitiesGrade);
      this.formManagerial.controls.fiabilite.setValue(this.managerial.candidatesManagerialAbilitiesReliability);
    });
  }

  clearFormManagerial() {
    this.formManagerial.controls.note.setValue('');
    this.formManagerial.controls.fiabilite.setValue('');
  }

  fillinTag() {
    this.customerService.getTagOfCandidate(this.id, this.idTag).subscribe(response => {
      this.candidateTag = response.data;
      this.formTag.controls.tag.setValue(this.candidateTag.tagId);
      this.formTagPop.controls.commentaire.setValue(this.candidateTag.candidateTagComment);
    });
  }

  clearFormTag() {
    this.formTag.controls.tag.setValue('');
    this.formTag.controls.commentaire.setValue('');
  }

  fillinLanguage() {
    this.customerService.getLanguageOfCandidate(this.id, this.idCandidateLanguage).subscribe(response => {
      this.candidateLanguage = response.data;
      this.formLanguage.controls.niveau.setValue(this.candidateLanguage.candidateLanguageLevel);
      this.formLanguage.controls.etrangere.setValue(this.candidateLanguage.candidateLanguageIsNative);
      this.formLanguage.controls.communication.setValue(this.candidateLanguage.candidateLanguageSpeakingLevel);
      this.formLanguage.controls.lecture.setValue(this.candidateLanguage.candidateLanguageReadingLevel);
      this.formLanguage.controls.ecriture.setValue(this.candidateLanguage.candidateLanguageWritingLevel);
    });
  }

  clearFormLanguage() {
    this.formLanguage.controls.niveau.setValue('');
    this.formLanguage.controls.etrangere.setValue('');
    this.formLanguage.controls.communication.setValue('');
    this.formLanguage.controls.lecture.setValue('');
    this.formLanguage.controls.ecriture.setValue('');
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(cvInput: any) {
    const file: File = cvInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log('selectedFile: ', this.selectedFile);
    });
    reader.readAsDataURL(file);
  }

  fillinCertification() {
    this.customerService.getCandidateCertificationId(this.idCertification).subscribe(response => {
      this.certification = response.data;
      this.formCertification.controls.titre.setValue(this.certification.certificationTitle);
      this.formCertification.controls.date.setValue(this.certification.dateOfObtaining);
      this.formCertification.controls.domaine.setValue(this.certification.certificationDomainId);
      this.formCertification.controls.fournisseur.setValue(this.certification.provider);
      this.formCertification.controls.note.setValue(this.certification.certificationGrade);
    });
  }

  fillinTraining() {
    this.customerService.getCandidateTrainingId(this.idTraining).subscribe(response => {
      this.training = response.data;
      this.formTraining.controls.titre.setValue(this.training.trainingTitle);
      this.formTraining.controls.start.setValue(this.training.trainingStartDate);
      this.formTraining.controls.end.setValue(this.training.trainingEndDate);
      this.formTraining.controls.ecole.setValue(this.training.schoolId);
      this.formTraining.controls.niveau.setValue(this.training.trainingLevelId);
    });
  }

  changePageToEditCv() {
    this.router.navigate([`/cv/${this.id}`]);
  }

  changePageToListCv() {
    this.router.navigate([`/listCVThéque`]);
    localStorage.setItem('suivant active', '0');
  }

  fillinExperience() {
    this.customerService.getExperienceId(this.idExperience).subscribe(response => {
      this.experienceDetails = response.data;
      this.formExperience.controls.titre.setValue(this.experienceDetails.experienceTitle);
      this.formExperience.controls.entreprise.setValue(this.experienceDetails.companieId);
      this.formExperience.controls.from.setValue(this.experienceDetails.experienceStartDate);
      this.formExperience.controls.descreption.setValue(this.experienceDetails.experienceDescription);
      this.formExperience.controls.lieu.setValue(this.experienceDetails.experiencePlace);
      this.formExperience.controls.to.setValue(this.experienceDetails.experienceEndDate);
    });
  }

  clearFromExperience() {
    this.formExperience.controls.titre.setValue('');
    this.formExperience.controls.entreprise.setValue('');
    this.formExperience.controls.from.setValue('');
    this.formExperience.controls.descreption.setValue('');
    this.formExperience.controls.lieu.setValue('');
    this.formExperience.controls.to.setValue('');
  }

  clearFormTraining() {
    this.formTraining.controls.titre.setValue('');
    this.formTraining.controls.start.setValue('');
    this.formTraining.controls.end.setValue('');
    this.formTraining.controls.ecole.setValue('');
    this.formTraining.controls.niveau.setValue('');
  }

  nextA() {
    this.menu++;
  }

  precedentA() {
    if (this.menu !== 1) {
      this.menu--;
    } else {
      this.router.navigate([`/cv/${this.id}`]);
    }
  }

  ajouterReliability() {
    const candidateReliability = {
      grade: this.formCandidateSkill2.controls.note.value,
      testMethodId: this.formCandidateSkill2.controls.test.value,
      candidateId: this.id,
      skillId: this.idSkill
    };
    this.customerService.postCandidateReliability(candidateReliability).subscribe(response => {
      const candidatesReliability = {
        candidateId: this.id,
        skillId: this.idSkill
      };
      this.customerService.getTestNamesTable(candidatesReliability).subscribe(response => {
        this.candidatesRealiability = response.data;
      });
      this.toastrService.success('reliability ajouter', 'Reliability', {
        timeOut: 2000,
      });
    });
  }

  putReliability() {
    const candidateReliability = {
      id: this.idTest,
      candidatesReliability: [{
        id: {
          candidate_skills_id: {
            candidate_id: this.id,
            skill_id: this.idSkill
          },
          test_method_id: this.idTest
        },
        grade: this.formCandidateSkill3.controls.note.value,
        testMethodId: this.idTest,
        candidateId: this.id,
        skillId: this.idSkill
      }]
    };
    this.customerService.putCandidateReliability(this.idTest, candidateReliability).subscribe(response => {
      const candidatesReliability = {
        candidateId: this.id,
        skillId: this.idSkill
      };
      this.customerService.getTestNamesTable(candidatesReliability).subscribe(response => {
        this.candidatesRealiability = response.data;
      });
      this.modelRef.hide();
      this.toastrService.success('reliability Modifier', 'Reliability', {
        timeOut: 2000,
      });
    });
  }

  selectCategory(value) {
    this.customerService.getSkillsOfCategory(value).subscribe(response => {
      this.skills = response.data;
    });
  }

  selectTestType(value) {
    console.log(value);
  }

  selectCategoryManagerial(value) {
    this.customerService.getManagerialCategory(value).subscribe(response => {
      this.managerials = response.data;
    });
  }

  showPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }

  showPop2(template: TemplateRef<any>) {
    this.modelRef2 = this.modelService.show(template, this.config);
  }

  showPop3(template: TemplateRef<any>) {
    this.modelRef3 = this.modelService.show(template, this.config2);
  }

  changePage(n: number) {
    this.page = n;
  }

  changeIdSkill(n: number) {
    this.idSkill = Number(n);
    const candidatesReliability = {
      candidateId: this.id,
      skillId: this.idSkill
    };
    this.customerService.getTestNamesTable(candidatesReliability).subscribe(response => {
      this.candidatesRealiability = response.data;
    });
  }

  changeIdProject(n: number) {
    this.idProject = Number(n);
  }

  changeIdTest(n: number) {
    this.idTest = Number(n);
  }

  changeIdManagerial(n: number) {
    this.idManagerial = Number(n);
  }

  changeActionAE(n: number) {
    this.actionAE = n;
  }

  changeIdTag(n: number) {
    this.idTag = Number(n);
  }

  changeTagName(name: string) {
    this.tagName = name;
  }

  changeIdCertification(n: number) {
    this.idCertification = Number(n);
  }

  changeIdExperience(n: number) {
    this.idExperience = Number(n);
  }

  delete() {
    if (this.deleteIndex === 1) {
      this.customerService.deleteSkillCandidate(this.id, this.idSkill).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Compétence supprimer', 'Compétence', {
          timeOut: 2000,
        });
      });
    } else if (this.deleteIndex === 2) {
      this.customerService.deleteManagerial(this.id, this.idManagerial).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Capacité managerielle supprimer', 'Capacité managerielle', {
          timeOut: 2000,
        });
      });
    } else if (this.deleteIndex === 3) {
      this.customerService.deleteTag(this.id, this.idTag).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Tag supprimer', 'Tag', {
          timeOut: 2000,
        });
      });
    } else if (this.deleteIndex === 4) {
      this.customerService.deleteLanguage(this.id, this.idCandidateLanguage).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Language supprimer', 'Language', {
          timeOut: 2000,
        });
      });
    } else if (this.deleteIndex === 5) {
      this.customerService.deleteCertification(this.idCertification).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Certification supprimer', 'Certification', {
          timeOut: 2000,
        });
      });
    } else if (this.deleteIndex === 6) {
      this.customerService.deleteTraining(this.idTraining).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Formation supprimer', 'Formation', {
          timeOut: 2000,
        });
      });
    } else if (this.deleteIndex === 7) {
      this.customerService.deleteExperience(this.idExperience).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Experience supprimer', 'Experience', {
          timeOut: 2000,
        });
      });
    } else if (this.deleteIndex === 8) {
      this.customerService.deleteProject(this.idProject).subscribe(response => {
        this.customerService.getProjectsByIdExperience(this.idExperience).subscribe(respo => {
          this.projects = respo.data['content'];
        });
        this.toastrService.success('Projet supprimer', 'Projet', {
          timeOut: 2000,
        });
      });
    } else if (this.deleteIndex === 9) {
      const body = {
        candidate_skills_id: {
          candidate_id: this.id,
          skill_id: this.idSkill
        },
        test_method_id: this.idTest
      };
      this.customerService.deleteTestCandidate(body).subscribe(response => {
        const candidatesReliability = {
          candidateId: this.id,
          skillId: this.idSkill
        };
        this.customerService.getTestNamesTable(candidatesReliability).subscribe(response => {
          this.candidatesRealiability = response.data;
        });
        this.toastrService.success('Reliability supprimer', 'Reliability', {
          timeOut: 2000,
        });
      });
    }
    this.modelRef.hide();
  }

  changeLanguageFlag(s: string) {
    this.languageFlag = s;
  }

  changeLanguageName(s: string) {
    this.languageName = s;
  }

  clearFormCertification() {
    this.formCertification.controls.titre.setValue('');
    this.formCertification.controls.date.setValue('');
    this.formCertification.controls.domaine.setValue('');
    this.formCertification.controls.fournisseur.setValue('');
    this.formCertification.controls.note.setValue('');
  }

  addCertification() {
    this.certification = new CertificationsModel();
    this.certification.id = this.idCertification;
    this.certification.certificationTitle = this.formCertification.controls.titre.value;
    this.certification.dateOfObtaining = this.formCertification.controls.date.value;
    this.certification.certificationDomainId = this.formCertification.controls.domaine.value;
    this.certification.provider = this.formCertification.controls.fournisseur.value;
    this.certification.certificationGrade = this.formCertification.controls.note.value;
    this.certification.candidateId = this.id;
    if (this.actionAE === 1) {
      this.customerService.addCandidateCertification(this.certification).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Certification ajouter', 'Certification', {
          timeOut: 2000,
        });
      });
    } else if (this.actionAE === 2) {
      this.customerService.editCertificationOfCandidate(this.idCertification, this.certification).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Certification modifié', 'Certification', {
          timeOut: 2000,
        });
      });
    } else {
    }
  }

  addProject() {
    this.project = new ProjectsModel();
    this.project.id = this.idProject;
    this.project.projectTitle = this.formProject.controls.titre.value;
    this.project.roles = this.formProject.controls.role.value;
    this.project.tasks = this.formProject.controls.tache.value;
    this.project.projectStartDate = this.formProject.controls.from.value;
    this.project.projectEndDate = this.formProject.controls.to.value;
    this.project.experienceId = this.idExperience;
    if (this.actionAE === 1) {
      this.customerService.addProject(this.project).subscribe(response => {
        this.customerService.getProjectsByIdExperience(this.idExperience).subscribe(respo => {
          this.projects = respo.data['content'];
        });
        this.toastrService.success('Projet ajouter', 'Projet', {
          timeOut: 2000,
        });
      });
    } else if (this.actionAE === 2) {
      this.customerService.editProject(this.idProject, this.project).subscribe(response => {
        this.customerService.getProjectsByIdExperience(this.idExperience).subscribe(respo => {
          this.projects = respo.data['content'];
        });
        this.toastrService.success('Projet modifié', 'Projet', {
          timeOut: 2000,
        });
      });
    }
  }

  addTraining() {
    this.training = new TrainingsModel();
    this.training.id = this.idTraining;
    this.training.trainingTitle = this.formTraining.controls.titre.value;
    this.training.trainingStartDate = this.formTraining.controls.start.value;
    this.training.trainingEndDate = this.formTraining.controls.end.value;
    this.training.schoolId = this.formTraining.controls.ecole.value;
    this.training.trainingLevelId = this.formTraining.controls.niveau.value;
    this.training.candidateId = this.id;
    if (this.actionAE === 1) {
      this.customerService.addCandidateTraining(this.training).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Formation ajouter', 'Formation', {
          timeOut: 2000,
        });
      });
    } else if (this.actionAE === 2) {
      this.customerService.editTrainingOfCandidate(this.idTraining, this.training).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Formation modifié', 'Formation', {
          timeOut: 2000,
        });
      });
    } else {
    }
  }

  addLanguage() {
    if (this.actionAE === 1) {
      const language = {
        languageId: this.idCandidateLanguage,
        candidateId: this.id,
        candidateLanguageIsNative: this.formLanguage.controls.etrangere.value,
        candidateLanguageWritingLevel: this.formLanguage.controls.ecriture.value,
        candidateLanguageLevel: this.formLanguage.controls.niveau.value,
        candidateLanguageSpeakingLevel: this.formLanguage.controls.communication.value,
        candidateLanguageReadingLevel: this.formLanguage.controls.lecture.value
      };
      this.customerService.addCandidateLanguage(language).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Language ajouter', 'Language', {
          timeOut: 2000,
        });
      });
    } else {
      const candidateBody = {
        id: this.id,
        candidatesLanguages: [{
          id: {
            candidate_id: this.id,
            language_id: this.idCandidateLanguage
          },
          languageId: this.idCandidateLanguage,
          candidateId: this.id,
          candidateLanguageIsNative: this.formLanguage.controls.etrangere.value,
          candidateLanguageWritingLevel: this.formLanguage.controls.ecriture.value,
          candidateLanguageLevel: this.formLanguage.controls.niveau.value,
          candidateLanguageSpeakingLevel: this.formLanguage.controls.communication.value,
          candidateLanguageReadingLevel: this.formLanguage.controls.lecture.value
        }]
      };
      this.customerService.editSkillOfCandidate(candidateBody.id, candidateBody).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Language modifié', 'Language', {
          timeOut: 2000,
        });
      });
    }
    this.modelRef.hide();
  }

  addExper() {
    this.experienceDetails = new ExperiencesDetailsModel();
    this.experienceDetails.id = this.idExperience;
    this.experienceDetails.candidateId = this.id;
    this.experienceDetails.experienceTitle = this.formExperience.controls.titre.value;
    this.experienceDetails.companieId = this.formExperience.controls.entreprise.value;
    this.experienceDetails.experienceStartDate = this.formExperience.controls.from.value;
    this.experienceDetails.experienceDescription = this.formExperience.controls.descreption.value;
    this.experienceDetails.experiencePlace = this.formExperience.controls.lieu.value;
    this.experienceDetails.experienceEndDate = this.formExperience.controls.to.value;
    if (this.actionAE === 1) {
      this.customerService.addExperience(this.experienceDetails).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Experience ajouter', 'Experience', {
          timeOut: 2000,
        });
      });
    } else {
      this.customerService.editExperience(this.experienceDetails.id, this.experienceDetails).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Experience modifié', 'Experience', {
          timeOut: 2000,
        });
      });
    }
  }

  addTags() {
    const tag = {
      candidateTagComment: this.formTag.controls.commentaire.value,
      candidateId: this.id,
      tagId: this.formTag.controls.tag.value,
    };
    const candidateBody = {
      id: this.id,
      candidatesTags: [{
        id: {
          tag_id: this.idTag,
          candidate_id: this.id
        },
        candidateTagComment: this.formTagPop.controls.commentaire.value,
        candidateId: this.id,
        tagId: this.idTag
      }]
    };
    if (this.actionAE === 1) {
      this.customerService.addCandidateTag(tag).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Tag ajouter', 'Tag', {
          timeOut: 2000,
        });
      });
    } else {
      this.customerService.editSkillOfCandidate(candidateBody.id, candidateBody).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Tag modifié', 'Tag', {
          timeOut: 2000,
        });
      });
    }
  }

  addManagerial() {
    const managerial = {
      candidatesManagerialAbilitiesGrade: this.formManagerial.controls.note.value,
      candidatesManagerialAbilitiesReliability: this.formManagerial.controls.fiabilite.value,
      candidateId: this.id,
      managerialAbilityId: this.idManagerial
    };
    const candidateBody = {
      id: this.id,
      candidatesManagerialAbilities: [{
        id: {
          candidate_id: this.id,
          managAbil_id: this.idManagerial
        },
        candidatesManagerialAbilitiesGrade: this.formManagerial.controls.note.value,
        candidatesManagerialAbilitiesReliability: this.formManagerial.controls.fiabilite.value,
        candidateId: this.id,
        managerialAbilityId: this.idManagerial
      }]
    };
    if (this.actionAE === 1) {
      this.customerService.addCandidateManagerialAbility(managerial).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Capacité managerielle ajouter', 'Capacité managerielle', {
          timeOut: 2000,
        });
      });
    } else {
      this.customerService.editSkillOfCandidate(candidateBody.id, candidateBody).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Capacité managerielle modifié', 'Capacité managerielle', {
          timeOut: 2000,
        });
      });
    }
    this.modelRef.hide();
  }

  addCandidateSkillFonction() {
    this.skill = new CandidateSkillModel();
    this.skill.candidateSkillGrade = this.formCandidateSkill.controls.note.value;
    this.skill.candidateSkillExperience = this.formCandidateSkill.controls.experience.value;
    this.skill.candidateSkillComment = this.formCandidateSkill.controls.commentaire.value;
    this.skill.candidateId = this.id;
    this.skill.skillId = this.idSkill;
    const candidateBody = {
      id: this.id,
      candidatesSkills: [{
        id: {
          skill_id: this.idSkill,
          candidate_id: this.id
        },
        candidateSkillGrade: this.formCandidateSkill.controls.note.value,
        candidateSkillExperience: this.formCandidateSkill.controls.experience.value,
        candidateSkillComment: this.formCandidateSkill.controls.commentaire.value,
        candidateId: this.id,
        skillId: this.idSkill
      }]
    };
    if (this.actionAE === 1) {
      this.customerService.addCandidateSkill(this.skill).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Compétence ajouter', 'Compétence', {
          timeOut: 2000,
        });
      });
    } else {
      this.skill.id = this.idCandidateSkill;
      this.customerService.editSkillOfCandidate(candidateBody.id, candidateBody).subscribe(response => {
        this.customerService.getCvid(this.id).subscribe(respo => {
          this.candidate = respo.data;
        });
        this.toastrService.success('Compétence modifié', 'Compétence', {
          timeOut: 2000,
        });
      });
    }
    this.modelRef.hide();
  }

  uploadCV() {
    let max = 100;
    this.progress = 0;
    let observer = interval(75).pipe(takeWhile(() => this.progress < max))
      .subscribe(() => {
        this.progress++;
        console.log(this.progress);
      });
    this.selectedFile.pending = true;
    this.customerService.uploadFileCv(this.selectedFile.file).subscribe(
      (res) => {
        this.progress = 100;
        console.log(res);
        const body = {
          cvLanguage: this.languageCv,
          cvVersion: this.versionCv,
          cvAttachmentId: res.data,
          candidateId: this.id
        };
        this.customerService.addDetailCv(body).subscribe(
          (res) => {
            this.listDetailCvTable();
          }
        );
        this.onSuccess();
      },
      (err) => {
        console.log(err);
        this.onError();
      });
  }
}
