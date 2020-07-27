import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Mission} from '../../../models/mission';
import {BusinessModel} from '../../../models/business.model';
import {MissionSuggestModel} from '../../../models/missionSuggest.model';
import {BStatutModel} from '../../../models/bStatut.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MissionsService} from '../../../services/missions.service';
import {MissionType} from '../../../models/missionType';
import {MissionStatusModel} from '../../../models/missionStatus.model';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';


@Component({
  selector: 'app-show-affaire',
  templateUrl: './show-affaire.component.html',
  styleUrls: ['./show-affaire.component.scss']
})
export class ShowAffaireComponent implements OnInit {
  missions: Array<Mission>;
  mission: Mission;
  affaire = new BusinessModel();
  missionS: Array<MissionSuggestModel>;
  busineesStatut: Array<BStatutModel>;
  busineesStatutDrop: string;
  id: number;
  showDiv: boolean;
  config = {backdrop: true, ignoreBackdropClick: false, class: 'modal-lg', style: 'margin-top: 30%'};
  modelRef: BsModalRef;
  page = 1;
  pageSize = 5;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  sort: any;
  filter: Mission = new Mission();
  profilesFilter: any = [];
  typeMissions: Array<MissionType>;
  missionStatus: Array<MissionStatusModel>;
  title: string;
  deadlineDate: string;
  fencedDate: string;
  comment: string;
  priority: string = '0';
  responsibleId: any;
  category: string;
  responsibleString: string = '0';
  dropdownSettings: IDropdownSettings;
  responsibleIdSelect: Array<any>;
  titleFieldDropdown: string = 'selectionner Responsable';

  constructor(private customerService: ProfileService,
              private serviceM: MissionsService,
              private router: Router,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private modelService: BsModalService) {
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      searchPlaceholderText: 'Pour Rechercher .....',
      clearSearchFilter: true
    };
    this.filter.missionTitle = '';
    this.filter.missionEstimatedDateStart = '';
    this.filter.missionStatusTitle = 'Statut ....';
    this.filter.missionTypeTitle = 'Type ....';
    this.serviceM.getMissionType().subscribe(response => {
      this.typeMissions = response.data;
      this.serviceM.getMissionStatus().subscribe(response => {
        this.missionStatus = response.data;
      });
    });
    this.showDiv = false;
    this.id = Number(this.route.snapshot.params['id']);
    this.customerService.getAid(this.id).subscribe(response => {
      this.affaire = response.data;
      this.busineesStatutDrop = this.affaire.businessStatuTitle;
    });
    this.customerService.getAid(this.id).subscribe(response => {
      this.affaire = response.data;
    });
    this.listMissionSuggest();
    this.customerService.getBStatut().subscribe(response => {
      this.busineesStatut = response.data;
    });
  }

  listMissionSuggest() {
    this.customerService.getMissionSuggest(this.id, this.page, 3).subscribe(response => {
      this.missionS = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    });
  }

  listMissions() {
    this.customerService.getMissionAffaire(this.page, this.pageSize, this.filter, this.sort, this.id).subscribe(response => {
      this.missions = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    }, (err) => {
    });
  }

  navigatePage(id: number) {
    this.router.navigate([`/business/${id}`]);
  }

  navigateMission(id: number) {
    localStorage.setItem('menu', '1');
    this.router.navigate([`/addMission/${id}`]);
  }

  navigateShowMission(id: number, id2: number) {
    this.router.navigate([`/mission/${id}/${id2}`]);
  }

  navigateEditMission(id: number, id2: number) {
    this.router.navigate([`/addMission/${id}/${id2}`]);
    localStorage.setItem('suivant active', '0');
    localStorage.setItem('menu', '1');
  }

  changeShowDiv(b: boolean) {
    if (b) {
      this.listMissions();
    } else {
      this.page = 1;
      this.listMissionSuggest();
    }
    this.showDiv = b;
  }

  changeMissionObject(mission: Mission) {
    this.mission = mission;
  }

  delete() {
    this.customerService.deleteMission(this.mission.id).subscribe(response => {
      this.listMissions();
      this.toastrService.success('Mission supprimer', 'Mission', {
        timeOut: 2000,
      });
    });
    this.modelRef.hide();
  }

  pageFilter(pageSize: number): void {
    this.pageSize = pageSize;
    this.itemsPerPage = pageSize;
    this.page = 1;
    this.listMissions();
  }

  onSorted(sort: any): void {
    this.sort = sort;
    this.listMissions();
  }

  pageChanged(page: number): void {
    this.page = page;
    if (this.showDiv) {
      this.listMissions();
    } else {
      this.listMissionSuggest();
    }
  }

  onFiltred(): void {
    this.listMissions();
  }

  showPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }
  changeResponsibleString() {
    this.customerService.getResponsable(this.responsibleString).subscribe(response => {
      this.responsibleIdSelect = response.data;
      if (this.responsibleString == 'candidates') {
        this.dropdownSettings = {
          textField: 'candidateFirstName'
        };
        this.titleFieldDropdown = 'Les Candidats';
      } else if (this.responsibleString == 'sourcers') {
        this.dropdownSettings = {
          textField: 'sourcerFirstName'
        };
        this.titleFieldDropdown = 'Les Partenaires';
      } else if (this.responsibleString == 'customers') {
        this.dropdownSettings = {
          textField: 'customerFullName'
        };
        this.titleFieldDropdown = 'Les Clients';
      } else {
        this.dropdownSettings = {
          textField: 'contactFirstName'
        };
        this.titleFieldDropdown = 'Les Cantacts';
      }
    });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  addAction() {
    const body = {
      title: this.title,
      deadlineDate: this.deadlineDate,
      fencedDate: this.fencedDate,
      comment: this.comment,
      priority: this.priority,
      responsibleId: this.responsibleId[0].id,
      concernedId: this.id,
      category: this.category
    };
    this.customerService.addAction(body).subscribe(response => {
      this.toastrService.success('Action ajouté', 'Action', {
        timeOut: 2000,
      });
    });
  }

  dropdownSlected(name: string, id: number) {
    this.busineesStatutDrop = name;
    const affaire = {
      id: this.id,
      businessStatuId: id
    };
    this.customerService.editBusiness(this.id, affaire).subscribe(response => {
    });
    this.toastrService.success('Statut Modifié', 'STATUT', {
      timeOut: 3000,
    });
  }
}
