import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  actions: Array<any>;
  page = 1;
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
              private modelService: BsModalService) { }

  ngOnInit() {
    this.listActions();
  }
  listActions(){
    this.customerService.getActionsTable(this.page).subscribe(response => {
      if (response){
        this.actions = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.itemsPerPage = response.data.size;
        this.numberOfItems = response.data.numberOfElements;
        this.showPages=true;
      }else {
        this.showPages=false;
      }
    });
  }
  pageChanged(page: number): void {
    this.page = page;
    this.listActions();
  }

}
