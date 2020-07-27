import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {SourcerModel} from '../../../models/Sourcer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-partenaire',
  templateUrl: './list-partenaire.component.html',
  styleUrls: ['./list-partenaire.component.scss']
})
export class ListPartenaireComponent implements OnInit {
  sourcer: Array<SourcerModel>;
  page = 1;
  pageSize = 5;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;
  showPage: boolean = false;

  constructor(private customerService: ProfileService,
              private router: Router) {
  }

  ngOnInit() {
    this.listPartenaire();
  }

  listPartenaire() {
    this.customerService.getPartenaire(this.page).subscribe(response => {
      if (response) {
        this.showPage = true;
        this.sourcer = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.itemsPerPage = response.data.size;
        this.numberOfItems = response.data.numberOfElements;
      } else {
        this.showPage = false;
      }
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.listPartenaire();
  }

  navigatePage(id: number) {
    this.router.navigate([`/sourcer/${id}`]);
  }

  navigateShowPage(id: number) {
    this.router.navigate([`/showSourcer/${id}`]);
  }

}
