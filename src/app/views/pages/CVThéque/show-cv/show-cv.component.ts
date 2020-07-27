import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CvtModel} from '../../../models/cvt.model';
import {BusinessModel} from '../../../models/business.model';
import {ActionTypes} from '../../../models/actionTypes';
import {ActionStatus} from '../../../models/actionStatus';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-show-cv',
  templateUrl: './show-cv.component.html',
  styleUrls: ['./show-cv.component.scss',
    '../../../../../assets/css/bootstrap.css']
})
export class ShowCvComponent implements OnInit {
  avatar: string;
  cv: CvtModel;
  business: Array<BusinessModel>;
  actionTypes: Array<ActionTypes>;
  actionStatus: Array<ActionStatus>;
  id: number;
  showDiv: boolean;
  modelRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
  page = 1;
  pageSize = 5;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  showPages = false;
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
              private router: Router,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private modelService: BsModalService) {
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'candidateFirstName',
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
    try {
      this.customerService.getCvid(this.id).subscribe(response => {
        this.cv = response.data;
        this.avatar = this.cv.candidateAvatar;
      });
      this.listAffaire();
      this.customerService.getActionStatus().subscribe(response => {
        this.actionStatus = response.data;
      });
      this.customerService.getActionTypes().subscribe(response => {
        this.actionTypes = response.data;
      });
    } catch (e) {
      console.log(e.toString());
    }
  }

  listAffaire() {
    this.customerService.getAOC(this.id, this.page).subscribe(response => {
      if (response) {
        this.business = response.data.content;
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
    this.page = page;
    this.listAffaire();
  }

  navigatePage(id: number) {
    this.router.navigate([`/cv/${id}`]);
    localStorage.setItem('suivant active', '0');
  }

  deleteCPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }

  deleteC() {
    this.customerService.deleteCustomer(this.id).subscribe(response => {
      this.router.navigate([`/listCustomer`]);
      this.modelRef.hide();
    });
  }

  actionCPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }

  hidepop(value) {
    console.log(value);
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
}
