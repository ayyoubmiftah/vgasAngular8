import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {BsModalService} from 'ngx-bootstrap';
import {MissionsService} from '../../../services/missions.service';
import {SkillsModel} from '../../../models/skills.model';
import {ManagerialAbilityModel} from '../../../models/managerialAbility.model';
import {TagsModel} from '../../../models/tags.model';
import {TrainingLevelModel} from '../../../models/trainingLevel.model';
import {CvtModel} from '../../../models/cvt.model';

@Component({
  selector: 'app-recherche-manuelle',
  templateUrl: './recherche-manuelle.component.html',
  styleUrls: ['./recherche-manuelle.component.scss']
})
export class RechercheManuelleComponent implements OnInit {
  tags: Array<TagsModel>;
  trainingLevels: Array<TrainingLevelModel>;
  managAbilities: Array<ManagerialAbilityModel>;
  skills: Array<SkillsModel>;
  page = 1;
  pageSize = 5;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  tagId: number;
  trainingLevelId: number;
  managerialAbilitiesId: number;
  skillId: number;
  rechercheTable: Array<CvtModel>;
  showPages = false;
  rechercheActive = false;

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
    this.listAllCvt();
    this.tagId = -1;
    this.skillId = -1;
    this.managerialAbilitiesId = -1;
    this.trainingLevelId = -1;
    this.serviceM.getTags().subscribe(response => {
      this.tags = response.data;
      this.serviceM.getSkills().subscribe(response => {
        this.skills = response.data;
        this.serviceM.getManagAbilities().subscribe(response => {
          this.managAbilities = response.data;
          this.serviceM.getTrainingLevels().subscribe(response => {
            this.trainingLevels = response.data;
          });
        });
      });
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    if (this.rechercheActive) {
      this.rechecheMulti();
    } else {
      this.listAllCvt();
    }
  }
  currentPage: number = 1;

  pageChange(page: number): void {
    console.log('New Page: ' + page);
  }

  rechecheMulti() {
    if (Number(this.skillId)===-1){
      this.skillId=null;
    }
    if (Number(this.tagId)===-1){
      this.tagId=null;
    }
    if (Number(this.trainingLevelId)===-1){
      this.trainingLevelId=null;
    }
    if (Number(this.managerialAbilitiesId)===-1){
      this.managerialAbilitiesId=null;
    }
    const body = {
      skillId: this.skillId,
      managerialAbilitiesId: this.managerialAbilitiesId,
      trainingLevelId: this.trainingLevelId,
      tagId: this.tagId
    };
    if (this.skillId===null){
      this.skillId=-1;
    }
    if (this.tagId===null){
      this.tagId=-1;
    }
    if (this.trainingLevelId===null){
      this.trainingLevelId=-1;
    }
    if (this.managerialAbilitiesId===null){
      this.managerialAbilitiesId=-1;
    }
    this.serviceM.rechercheMulti(body, this.page).subscribe(response => {
      if (response) {
        this.rechercheTable = response.data.content;
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

  listAllCvt() {
    this.serviceM.getCvt(this.page).subscribe(response => {
      this.rechercheTable = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
      this.showPages = true;
    });
  }


}
