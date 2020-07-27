import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {Router} from '@angular/router';
import {BusinessModel} from '../../../models/business.model';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-list-affaire',
  templateUrl: './list-affaire.component.html',
  styleUrls: ['./list-affaire.component.scss']
})
export class ListAffaireComponent implements OnInit {
  business: Array<BusinessModel>;
  id: number;
  MOA: any[] = [];
  nbMissionArray: number[] = [];
  nbMission: number;
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

  constructor(private customerService: ProfileService,
              private router: Router,
              private toastrService: ToastrService,
              private modelService: BsModalService) {
  }


  ngOnInit() {
        this.listAffaire();
  }

  listAffaire() {
    this.customerService.getBusiness(this.page).subscribe(response => {
      this.business = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    });
  }
  pageChanged(page: number): void {
    this.page = page;
    this.listAffaire();
  }

  navigatePage(id: number) {
    this.router.navigate([`/business/${id}`]);
  }

  navigatePageShow(id: number) {
    this.router.navigate([`/showAffaire/${id}`]);
  }

  deleteAffaire2(id: number) {
    this.customerService.deleteAffaire(id).subscribe(response => {
      this.listAffaire();
    });
    this.modelRef.hide();
    this.toastrService.success('Affaire Supprimer', 'Affaire', {
      timeOut: 2000,
    });
  }

  deleteAffaire(template: TemplateRef<any>, id: number) {
    this.id = id;
    this.modelRef = this.modelService.show(template, this.config);
  }

}
