import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {Router} from '@angular/router';
import {CustomervModel} from '../../../models/customerv.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class ListCustomerComponent implements OnInit {
  customers: Array<CustomervModel>;
  show = false;
  page = 1;
  pageSize = 5;
  totalElements: number;
  totalPages: number;
  numberOfItems: number;
  itemsPerPage: number;

  constructor(private customerService: ProfileService,
              private router: Router) {
  }

  navigatePage(id: number) {
    this.router.navigate([`/customer/${id}`]);
  }

  navigateShowC(id: number) {
    this.router.navigate([`/showCustomer/${id}`]);
  }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }


  toggle() {
    this.show = !this.show;
  }

  ngOnInit() {
    this.listCustomer();
  }

  listCustomer() {
    this.customerService.getCustomerPaged(this.page).subscribe(response => {
      this.customers = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.itemsPerPage = response.data.size;
      this.numberOfItems = response.data.numberOfElements;
    });
  }

  pageChanged(page: number): void {
    this.page = page;
    this.listCustomer();
  }

}
