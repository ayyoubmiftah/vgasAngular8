import {Component, OnInit, TemplateRef} from '@angular/core';
import {CvtModel} from '../../../models/cvt.model';
import {BusinessModel} from '../../../models/business.model';
import {ActionTypes} from '../../../models/actionTypes';
import {ActionStatus} from '../../../models/actionStatus';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ProfileService} from '../../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SourcerModel} from '../../../models/Sourcer.model';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-show-sourcer',
  templateUrl: './show-sourcer.component.html',
  styleUrls: ['./show-sourcer.component.scss',
  '../../../../../assets/css/bootstrap.css']
})
export class ShowSourcerComponent implements OnInit {
  sourcer: SourcerModel;
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
  showPages=false;
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
              private modelService: BsModalService) { }

  ngOnInit() {
    this.showDiv = false ;
    this.id = this.route.snapshot.params['id'];
    try {
      this.customerService.getSid(this.id).subscribe(response => {
        this.sourcer = response.data;
      });
      this.listAffaire();
      this.customerService.getActionStatus().subscribe(response => {
        this.actionStatus = response.data;
      });
      this.customerService.getActionTypes().subscribe(response => {
        this.actionTypes = response.data;
      });
    }
    catch (e) {
      console.log(e.toString());
    }
  }
  listAffaire(){
    this.customerService.getAOC(this.id,this.page).subscribe(response => {
      if (response){
        this.showPages=true;
        this.business = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.itemsPerPage = response.data.size;
        this.numberOfItems = response.data.numberOfElements;
      }else {
        this.showPages=false;
      }
    });
  }
  pageChanged(page: number): void {
    this.page = page;
    this.listAffaire();
  }
  navigatePage(id: number) {
    this.router.navigate([`/sourcer/${id}`]);
  }
  deleteCPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }
  deleteC(){
    this.customerService.deleteCustomer(this.id).subscribe(response => {
      this.router.navigate([`/listCustomer`]);
      this.modelRef.hide();
    });
  }
  actionCPop(template: TemplateRef<any>) {
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
