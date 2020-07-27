import {Component, OnInit, TemplateRef} from '@angular/core';
import {CvtModel} from '../../../models/cvt.model';
import {BusinessModel} from '../../../models/business.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ProfileService} from '../../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Mission} from '../../../models/mission';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {FormBuilder, Validators} from '@angular/forms';
import {ShortlistModel} from '../../../models/shortlist.model';
import {ShortlistTypeModel} from '../../../models/shortlistType.model';
import {ShorlistSeriesModel} from '../../../models/shorlistSeries.model';

@Component({
  selector: 'app-show-mission',
  templateUrl: './show-mission.component.html',
  styleUrls: ['./show-mission.component.scss',
    '../../../../../assets/css/bootstrap.css']
})
export class ShowMissionComponent implements OnInit {
  avatar: string;
  mission: Mission;
  business: Array<BusinessModel>;
  shortlistSelect: Array<CvtModel>;
  id: number;
  showDiv: boolean;
  modelRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
  id2: number;
  dropdownSettings: IDropdownSettings;
  dropdown2Settings: IDropdownSettings;
  selectedItems = [];
  selectedType;
  formShortlist;
  candidatesIds: number[] = [];
  commentaire: string;
  titre: string;
  shortlists: Array<ShortlistModel>;
  shortlistsSeriesTable: Array<ShorlistSeriesModel>;
  tableCandidates: Array<CvtModel>;
  shortlistType: Array<ShortlistTypeModel>;
  title: string;
  deadlineDate: string;
  fencedDate: string;
  comment: string;
  priority: string = '0';
  responsibleId: any;
  category: string;
  responsibleString: string = '0';
  dropdown3Settings: IDropdownSettings;
  responsibleIdSelect: Array<any>;
  titleFieldDropdown: string = 'selectionner Responsable';

  constructor(private customerService: ProfileService,
              private router: Router,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modelService: BsModalService) {
    this.formShortlist = this.formBuilder.group({
      commentaire: ['', Validators.required],
      bool: [false, Validators.required]
    });
  }

  ngOnInit() {
    this.dropdown3Settings = {
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
    this.avatar = 'avatarr.jpg';
    this.showDiv = false;
    this.id = Number(this.route.snapshot.params['id']);
    this.id2 = Number(this.route.snapshot.params['id2']);
    try {
      this.customerService.getMissionId(this.id2).subscribe(res => {
        this.mission = res.data;
      });
      this.customerService.getShortlistsSeriesTable(this.id2).subscribe(res => {
        this.shortlistsSeriesTable = res.data;
      });
      this.customerService.getShortlistType().subscribe(res => {
        this.shortlistType = res.data;
      });
    } catch (e) {
      console.log(e.toString());
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'cadidateFirstAndLastName',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      searchPlaceholderText: 'Pour Rechercher .....',
      clearSearchFilter: true
    };
    this.dropdown2Settings = {
      singleSelection: true,
      idField: 'id',
      textField: 'shortlistsStepTitle',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Déselectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      searchPlaceholderText: 'Pour Rechercher .....',
      clearSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log('selected');
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
  }

  navigatePage(id: number, id2: number) {
    this.router.navigate([`/addMission/${id2}/${id}`]);
  }

  deleteCPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }

  deleteC() {
    this.customerService.deleteMission(this.id).subscribe(response => {
      this.modelRef.hide();
    });
  }

  actionCPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }

  showTableCandidates(id: number) {
    this.customerService.getTableCandidatesShortlist(id).subscribe(response => {
      this.tableCandidates = response.data;
    });
  }
  getTableShortlist(id: number){
    this.customerService.getTableShortlists(id).subscribe(response => {
      this.shortlists = response.data;
    });
  }

  delete() {
    this.modelRef.hide();
  }

  addShortListSerie() {
    const shortListSerie = {
      comment: this.commentaire,
      missionId: this.id2,
      title: this.titre
    };
    this.customerService.addShortList(shortListSerie).subscribe(res => {
      if (res) {
        this.customerService.getShortlistsSeriesTable(this.id2).subscribe(res => {
          this.shortlistsSeriesTable = res.data;
        });
        this.toastrService.success('ShortList ajouter', 'ShortList', {
          timeOut: 2000,
        });
      }
    });
  }

  changeResponsibleString() {
    this.customerService.getResponsable(this.responsibleString).subscribe(response => {
      this.responsibleIdSelect = response.data;
      if (this.responsibleString == 'candidates') {
        this.dropdown3Settings = {
          textField: 'candidateFirstName'
        };
        this.titleFieldDropdown = 'Les Candidats';
      } else if (this.responsibleString == 'sourcers') {
        this.dropdown3Settings = {
          textField: 'sourcerFirstName'
        };
        this.titleFieldDropdown = 'Les Partenaires';
      } else if (this.responsibleString == 'customers') {
        this.dropdown3Settings = {
          textField: 'customerFullName'
        };
        this.titleFieldDropdown = 'Les Clients';
      } else {
        this.dropdown3Settings = {
          textField: 'contactFirstName'
        };
        this.titleFieldDropdown = 'Les Cantacts';
      }
    });
  }

  addAction() {
    const body = {
      title: this.title,
      deadlineDate: this.deadlineDate,
      fencedDate: this.fencedDate,
      comment: this.comment,
      priority: this.priority,
      responsibleId: this.responsibleId[0].id,
      ConcernedId: this.id,
      category: this.category
    };
    this.customerService.addAction(body).subscribe(response => {
      this.toastrService.success('Action ajouté', 'Action', {
        timeOut: 2000,
      });
    });
  }
}
