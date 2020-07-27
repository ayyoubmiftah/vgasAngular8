import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {CvtModel} from '../../../models/cvt.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-cv',
  templateUrl: './list-cv.component.html',
  styleUrls: ['./list-cv.component.scss',
    './font.scss']
})
export class ListCvComponent implements OnInit {
  cvt: CvtModel[];
  page = 1;
  pageSize = 5;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;

  constructor(private customerService: ProfileService,
              private router: Router,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.cvt = null;
    this.listCvt();
  }

  listCvt() {
    this.customerService.getCvt(this.page).subscribe(response => {
      this.cvt = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    });
  }

  navigatePage(id: number) {
    this.router.navigate([`/cv/${id}`]);
    localStorage.setItem('suivant active', '0');
  }

  navigateshowPage(id: number) {
    this.router.navigate([`/showCv/${id}`]);
  }

  deleteCv(id: number) {
    this.customerService.deleteCvt(id).subscribe(response => {
      this.toastrService.success('candidat Supprimer', 'candidat', {
        timeOut: 2000,
      });
      this.listCvt();
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.listCvt();
  }

}
