import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CustomervModel} from '../../../models/customerv.model';
import {Mission} from '../../../models/mission';
import {MissionType} from '../../../models/missionType';
import {MissionStatusModel} from '../../../models/missionStatus.model';
import {MissionsService} from '../../../services/missions.service';
import {SkillsModel} from '../../../models/skills.model';
import {SkillCategoriesModel} from '../../../models/request/skillCategories.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MissionSkillModel} from '../../../models/missionSkill.model';
import {ManagerialCategoryModel} from '../../../models/managerialCategory.model';
import {ManagerialAbilityModel} from '../../../models/managerialAbility.model';
import {MissionManagerialAbilityModel} from '../../../models/missionManagerialAbility.model';
import {LanguageModel} from '../../../models/language.model';
import {MissionLanguageModel} from '../../../models/missionLanguage.model';
import {TrainingLevelModel} from '../../../models/trainingLevel.model';
import {TrainingsModel} from '../../../models/trainings.model';
import {TagsModel} from '../../../models/tags.model';
import {MissionTagsModel} from '../../../models/missionTags.model';
import {Location} from '@angular/common';

@Component({
    selector: 'app-add-mission',
    templateUrl: './add-mission.component.html',
    styleUrls: ['./add-mission.component.scss']
})
export class AddMissionComponent implements OnInit {
    missionTag: MissionTagsModel;
    idTag: number;
    tags: TagsModel[];
    idTraining: number;
    training: TrainingsModel;
    trainingLevel: TrainingLevelModel[];
    missionLanguage: MissionLanguageModel;
    idCandidateLanguage: number;
    languageName: string;
    languageFlag: string;
    languages: LanguageModel[];
    managerial: MissionManagerialAbilityModel;
    idManagerial: number;
    formManagerial;
    managerialAbilities: ManagerialAbilityModel[];
    managerials: ManagerialCategoryModel[];
    deleteIndex: number;
    actionAE: number;
    skillCategories: SkillCategoriesModel[];
    skills: SkillsModel[];
    id: number;
    id2: number;
    formMission;
    mission: Mission;
    missionEdit: Mission;
    menu: number;
    missionType: Array<MissionType>;
    missionStatus: Array<MissionStatusModel>;
    customer: CustomervModel;
    modelRef: BsModalRef;
    config = {backdrop: true, ignoreBackdropClick: false, class: 'modal-lg'};
    skill: MissionSkillModel;
    formMissionSkill;
    idSkill: number;
    iconSkill: string;
    page: number;
    formLanguage;
    formTraining;
    formTag;

    constructor(private customerService: ProfileService,
                private router: Router,
                private route: ActivatedRoute,
                private http: HttpClient,
                private formBuilder: FormBuilder,
                private toastrService: ToastrService,
                private location: Location,
                private modelService: BsModalService,
                private serviceM: MissionsService) {
        this.formMission = this.formBuilder.group({
            titre: ['', Validators.required],
            type: ['', Validators.required],
            date: ['', Validators.required],
            dateFin: ['', Validators.required],
            nombre: ['', Validators.required],
            description: ['', Validators.required],
        });
        this.formMissionSkill = this.formBuilder.group({
            note: ['', Validators.required],
            fiabilite: ['', Validators.required],
            experience: ['', Validators.required]
        });
        this.formManagerial = this.formBuilder.group({
            note: ['', Validators.required],
            fiabilite: ['', Validators.required],
        });
        this.formLanguage = this.formBuilder.group({
            niveau: ['', Validators.required],
            etrangere: [false, Validators.required],
            communication: ['', Validators.required],
            lecture: ['', Validators.required],
            ecriture: ['', Validators.required]
        });
        this.formTraining = this.formBuilder.group({
            niveau: ['', Validators.required]
        });
        this.formTag = this.formBuilder.group({
            tag: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.actionAE = 1;
        this.id2 = Number(this.route.snapshot.params['id2']);
        this.id = Number(this.route.snapshot.params['id']);
        this.serviceM.getMissionType().subscribe(response => {
            this.missionType = response.data;
        });
        this.menu = Number(localStorage.getItem('menu'));
        this.fillMission();
    }

    nextMenu() {
      this.fillDetailMission();
        if (this.menu === 1) {
            this.addMission();
            this.menu++;
        } else {
            this.menu++;
        }
    }

    prevMenu() {
        if (this.menu === 1 || !this.localstorageSuivant()) {
            this.location.back();
        } else {
            this.menu--;
        }
    }

    addTraining() {
        this.training = new TrainingsModel();
        this.training.trainingLevelId = Number(this.formTraining.controls.niveau.value);
        this.training.missionId = this.id;
        const missionBody = {
            id: this.id,
            missionTrainingLevels: [{
                id: {
                    mission_id: this.id,
                    training_level_id: this.idTraining
                },
                missionId: this.id,
                trainingLevelId: Number(this.formTraining.controls.niveau.value)
            }]
        };
        if (this.actionAE === 1) {
            this.customerService.addMissionTraining(this.training).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Formation ajouter', 'Formation', {
                    timeOut: 2000,
                });
            });
        } else if (this.actionAE === 2) {
            this.customerService.editSkillOfMission(this.id, missionBody).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Formation modifié', 'Formation', {
                    timeOut: 2000,
                });
            });
        }
    }

    fillinTraining() {
        this.customerService.getMissionTrainingId(this.id, this.idTraining).subscribe(response => {
            this.training = response.data;
            this.formTraining.controls.niveau.setValue(this.training.trainingLevelId);
        });
    }

    clearFormTraining() {
        this.formTraining.controls.niveau.setValue('');
    }

    changeIdTraining(n: number) {
        this.idTraining = Number(n);
    }

    fillinLanguage() {
        this.customerService.getLanguageOfMission(this.id, this.idCandidateLanguage).subscribe(response => {
            this.missionLanguage = response.data;
            this.formLanguage.controls.niveau.setValue(this.missionLanguage.missionLanguageLevel);
            this.formLanguage.controls.etrangere.setValue(this.missionLanguage.missionLanguageIsNative);
            this.formLanguage.controls.communication.setValue(this.missionLanguage.missionLanguageSpeakingLevel);
            this.formLanguage.controls.lecture.setValue(this.missionLanguage.missionLanguageReadingLevel);
            this.formLanguage.controls.ecriture.setValue(this.missionLanguage.missionLanguageWritingLevel);
        });
    }

    changeIdCandidateLanguage(n: number) {
        this.idCandidateLanguage = Number(n);
    }

    addLanguage() {
        if (this.actionAE === 1) {
            this.missionLanguage = new MissionLanguageModel();
            this.missionLanguage.languageId = this.idCandidateLanguage;
            this.missionLanguage.missionId = this.id;
            this.missionLanguage.missionLanguageIsNative = this.formLanguage.controls.etrangere.value;
            this.missionLanguage.missionLanguageWritingLevel = this.formLanguage.controls.ecriture.value;
            this.missionLanguage.missionLanguageLevel = this.formLanguage.controls.niveau.value;
            this.missionLanguage.missionLanguageSpeakingLevel = this.formLanguage.controls.communication.value;
            this.missionLanguage.missionLanguageReadingLevel = this.formLanguage.controls.lecture.value;

            this.customerService.addMissionLanguage(this.missionLanguage).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Language ajouter', 'Language', {
                    timeOut: 2000,
                });
            });
        } else {
            const missionBody = {
                id: this.id,
                missionLanguages: [{
                    id: {
                        language_id: this.idCandidateLanguage,
                        mission_id: this.id
                    },
                    languageId: this.idCandidateLanguage,
                    missionId: this.id,
                    missionLanguageIsNative: this.formLanguage.controls.etrangere.value,
                    missionLanguageWritingLevel: this.formLanguage.controls.ecriture.value,
                    missionLanguageLevel: this.formLanguage.controls.niveau.value,
                    missionLanguageSpeakingLevel: this.formLanguage.controls.communication.value,
                    missionLanguageReadingLevel: this.formLanguage.controls.lecture.value
                }]
            };
            this.customerService.editSkillOfMission(missionBody.id, missionBody).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Language modifié', 'Language', {
                    timeOut: 2000,
                });
            });
        }
        this.modelRef.hide();
    }

    addManagerial() {
        this.managerial = new MissionManagerialAbilityModel();
        this.managerial.missionManagerialAbilitiesGrade = this.formManagerial.controls.note.value;
        this.managerial.missionManagerialAbilitiesReliability = this.formManagerial.controls.fiabilite.value;
        this.managerial.missionId = this.id;
        this.managerial.managerialAbilityId = this.idManagerial;
        if (this.actionAE === 1) {
            this.customerService.addMissionManagerialAbility(this.managerial).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Capacité managerielle ajouter', 'Capacité managerielle', {
                    timeOut: 2000,
                });
            });
        } else {
            const missionBody = {
                id: this.id,
                missionManagerialAbilities: [{
                    id: {
                        mission_id: this.id,
                        managAbil_id: this.idManagerial
                    },
                    missionManagerialAbilitiesGrade: this.formManagerial.controls.note.value,
                    missionManagerialAbilitiesReliability: this.formManagerial.controls.fiabilite.value,
                    missionId: this.id,
                    managerialAbilityId: this.idManagerial
                }]
            };
            this.customerService.editSkillOfMission(missionBody.id, missionBody).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Capacité managerielle modifié', 'Capacité managerielle', {
                    timeOut: 2000,
                });
            });
        }
        this.modelRef.hide();
    }

    addTags() {
        if (this.actionAE === 1) {
            const tag = {
                missionId: this.id,
                tagId: Number(this.formTag.controls.tag.value),
            };
            this.customerService.addMissionTag(tag).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Tag ajouter', 'Tag', {
                    timeOut: 2000,
                });
            });
        } else {
            const missionBody = {
                id: this.id,
                missionTags: [{
                    id: {
                        mission_id: this.id,
                        tag_id: this.missionTag.tagId
                    },
                    missionId: this.id,
                    tagId: Number(this.formTag.controls.tag.value)
                }]
            };
            this.customerService.editSkillOfMission(missionBody.id, missionBody).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Tag modifié', 'Tag', {
                    timeOut: 2000,
                });
            });
        }
    }

    changeIdTag(n: number) {
        this.idTag = Number(n);
    }

    fillinTag() {
        this.customerService.getTagOfMission(this.id, this.idTag).subscribe(response => {
            this.missionTag = response.data;
            this.formTag.controls.tag.setValue(this.missionTag.tagId);
        });
    }

    clearFormTag() {
        this.formTag.controls.tag.setValue('');
    }

    fillinSkill() {
        this.customerService.getSkillOfMission(this.id, this.idSkill).subscribe(response => {
            this.skill = response.data;
            this.formMissionSkill.controls.note.setValue(this.skill.missionSkillGrade);
            this.formMissionSkill.controls.fiabilite.setValue(this.skill.missionSkillReliability);
            this.formMissionSkill.controls.experience.setValue(this.skill.missionSkillExperience);
        });
    }

    fillinManagerial() {
        this.customerService.getManagerialOfMission(this.id, this.idManagerial).subscribe(response => {
            this.managerial = response.data;
            this.formManagerial.controls.note.setValue(this.managerial.missionManagerialAbilitiesGrade);
            this.formManagerial.controls.fiabilite.setValue(this.managerial.missionManagerialAbilitiesReliability);
        });
    }

    clearFormManagerial() {
        this.formManagerial.controls.note.setValue('');
        this.formManagerial.controls.fiabilite.setValue('');
    }

    clearFormSkill() {
        this.formMissionSkill.controls.note.setValue('');
        this.formMissionSkill.controls.fiabilite.setValue('');
        this.formMissionSkill.controls.experience.setValue('');
    }

    showPop(template: TemplateRef<any>) {
        this.modelRef = this.modelService.show(template, this.config);
    }

    changeMenu(n: number) {
        this.menu = n;
        this.actionAE = 1;
    }

    selectCategory(value) {
        this.customerService.getSkillsOfCategory(value).subscribe(response => {
            this.skills = response.data;
        });
    }

    changeDeleteIndex(n: number) {
        this.deleteIndex = n;
    }

    addMission() {
        const mission = {
            id: this.id,
            missionTitle: this.formMission.controls.titre.value,
            missionEstimatedDateStart: this.formMission.controls.date.value,
            missionAbout: this.formMission.controls.description.value,
            missionEstimatedDateEnd: this.formMission.controls.dateFin.value,
            missionProfiles: this.formMission.controls.nombre.value,
            businessId: this.id2,
            // missionStatusTitle: {id: this.formMission.controls.sta.value},
            missionTypeId: Number(this.formMission.controls.type.value)
        };
        if (!this.returnId()) {
            this.serviceM.addMission(mission).subscribe(response => {
                this.toastrService.success('Mission ajouté', 'MISSION', {
                    timeOut: 2000,
                });
                this.id = response.data.id;
                localStorage.setItem('menu','2');
                this.router.navigate([`/addMission/${this.id2}/${this.id}`]);
            }, err => {
            });
        } else {
            this.serviceM.editMission(this.id, mission).subscribe(response => {
                this.toastrService.success('Mission Modifié', 'MISSION', {
                    timeOut: 2000,
                });
                if (localStorage.getItem('menu') === '1') {
                    this.router.navigate(['/listAffaire']);
                }
            }, err => {
            });
        }
    }
    navigateComplete(){
        this.router.navigate(['/listAffaire']);
    }

    returnId(): boolean {
        return this.id > 0;
    }

    fillMission() {
        if (this.returnId()) {
            this.serviceM.getMId(this.id).subscribe(response => {
                this.missionEdit = response.data;
                this.formMission.controls.titre.setValue(this.missionEdit.missionTitle);
                this.formMission.controls.type.setValue(this.missionEdit.missionTypeId);
                this.formMission.controls.date.setValue(this.missionEdit.missionEstimatedDateStart);
                this.formMission.controls.dateFin.setValue(this.missionEdit.missionEstimatedDateEnd);
                this.formMission.controls.nombre.setValue(this.missionEdit.missionProfiles);
                this.formMission.controls.description.setValue(this.missionEdit.missionAbout);
                this.fillDetailMission();
            });
        } else {
            localStorage.setItem('suivant active', '1');
        }
    }
    fillDetailMission(){
      this.customerService.getSkillCategory().subscribe(response => {
        this.skillCategories = response.data;
      });
      this.customerService.getMissionsDetail(this.id).subscribe(respo => {
        this.mission = respo.data;
      });
      this.iconSkill = 'fab fa-java';
      this.customerService.getManagerialAbility().subscribe(response => {
        this.managerialAbilities = response.data;
      });
      this.customerService.getTrainingLevel().subscribe(response => {
        this.trainingLevel = response.data;
      });
      this.customerService.getTags().subscribe(response => {
        this.tags = response.data;
      });
      this.customerService.getMissionStatut().subscribe(response => {
        this.missionStatus = response.data;
      });
      this.customerService.getLanguages().subscribe(response => {
        this.languages = response.data;
      });
    }

    selectCategoryManagerial(value) {
        this.customerService.getManagerialCategory(value).subscribe(response => {
            this.managerials = response.data;
        });
    }

    localstorageSuivant(): boolean {
        return localStorage.getItem('suivant active') === '1';
    }

    delete() {
        if (this.deleteIndex === 1) {
            this.customerService.deleteSkillMission(this.id, this.idSkill).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Compétence supprimer', 'Compétence', {
                    timeOut: 2000,
                });
            });
        } else if (this.deleteIndex === 2) {
            this.customerService.deleteManagerialOfMission(this.id, this.idManagerial).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Capacité managerielle supprimer', 'Capacité managerielle', {
                    timeOut: 2000,
                });
            });
        } else if (this.deleteIndex === 3) {
            this.customerService.deleteLanguageMission(this.id, this.idCandidateLanguage).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Language supprimer', 'Language', {
                    timeOut: 2000,
                });
            });
        } else if (this.deleteIndex === 4) {
            this.customerService.deleteTrainingMission(this.id, this.idTraining).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Formation supprimer', 'Formation', {
                    timeOut: 2000,
                });
            });
        } else if (this.deleteIndex === 5) {
            this.customerService.deleteTagMission(this.id, this.idTag).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Tag supprimer', 'Tag', {
                    timeOut: 2000,
                });
            });
        }
        this.modelRef.hide();
    }

    changeActionAE(n: number) {
        this.actionAE = n;
    }

    addCandidateSkillFonction() {
        this.skill = new MissionSkillModel();
        this.skill.missionSkillGrade = this.formMissionSkill.controls.note.value;
        this.skill.missionSkillExperience = this.formMissionSkill.controls.experience.value;
        this.skill.missionId = this.id;
        this.skill.skillId = this.idSkill;
        const missionBody = {
            id: this.id,
            missionSkills: [{
                id: {
                    mission_id: this.id,
                    skill_id: this.idSkill
                },
                missionSkillGrade: this.formMissionSkill.controls.note.value,
                missionSkillExperience: this.formMissionSkill.controls.experience.value,
                missionId: this.id,
                skillId: this.idSkill
            }]
        };
        if (this.actionAE === 1) {
            this.customerService.addMissionSkill(this.skill).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Compétence ajouter', 'Compétence', {
                    timeOut: 2000,
                });
            });
        } else {
            this.customerService.editSkillOfMission(missionBody.id, missionBody).subscribe(response => {
                this.customerService.getMissionsDetail(this.id).subscribe(respo => {
                    this.mission = respo.data;
                });
                this.toastrService.success('Compétence modifié', 'Compétence', {
                    timeOut: 2000,
                });
            });
        }
        this.modelRef.hide();
    }

    changeIdSkill(n: number) {
        this.idSkill = Number(n);
    }

    changeIdManagerial(n: number) {
        this.idManagerial = n;
    }

    changeLanguageFlag(s: string) {
        this.languageFlag = s;
    }

    changeLanguageName(s: string) {
        this.languageName = s;
    }

    clearFormLanguage() {
        this.formLanguage.controls.niveau.setValue('');
        this.formLanguage.controls.etrangere.setValue('');
        this.formLanguage.controls.communication.setValue('');
        this.formLanguage.controls.lecture.setValue('');
        this.formLanguage.controls.ecriture.setValue('');
    }
}
