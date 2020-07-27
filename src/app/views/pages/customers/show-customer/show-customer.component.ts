import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomervModel} from '../../../models/customerv.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BusinessModel} from '../../../models/business.model';
import {Contact} from '../../../models/contact';
import {FormBuilder, Validators} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {takeWhile} from 'rxjs/operators';
import {interval} from 'rxjs';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.scss', '../../../../../assets/css/bootstrap.css']
})
export class ShowCustomerComponent implements OnInit {
  avatar: string;
  customer: CustomervModel;
  contact: Contact;
  business: Array<BusinessModel>;
  contacts: Array<Contact>;
  id: number;
  idC: number;
  n1: number;
  formContact;
  Div: boolean;
  modelRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
  imageChangedEvent: any;
  croppedImage: string = 'data:image/png;base64,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';
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
  actionClientCantact: number;
  li: number = 8;

  constructor(private customerService: ProfileService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private modelService: BsModalService) {
    this.formContact = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
      main: ['', Validators.required],
      job: ['', Validators.required],
    });
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
    this.avatar = 'avatarr.jpg';
    this.Div = true;
    this.id = this.route.snapshot.params['id'];
    try {
      this.customerService.getCid(this.id).subscribe(response => {
        this.customer = response.data;
        this.avatar = this.customer.customerAvatar;
      });
      this.listAffaire();
    } catch (e) {
      console.log(e.toString());
    }
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

  addActionCustomer() {
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

  addActionCantact() {
    const body = {
      title: this.title,
      deadlineDate: this.deadlineDate,
      fencedDate: this.fencedDate,
      comment: this.comment,
      priority: this.priority,
      responsibleId: this.responsibleId[0].id,
      ConcernedId: this.idC,
      category: this.category
    };
    this.customerService.addAction(body).subscribe(response => {
      this.toastrService.success('Action ajouté', 'Action', {
        timeOut: 2000,
      });
    });

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64.toString();
  }

  navigatePage(id: number) {
    this.router.navigate([`/customer/${id}`]);
  }

  changeDiv() {
    if (this.Div) {
      this.page = 1;
      this.Div = false;
      this.listContacts();
    } else {
      this.page = 1;
      this.Div = true;
      this.listAffaire();
    }
  }

  navigateAfaireCustomer() {
    this.router.navigate([`/business/0/${this.id}`]);
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

  listContacts() {
    this.customerService.getCOC(this.id, this.page).subscribe(response => {
      if (response) {
        this.showPages = true;
        this.contacts = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        this.itemsPerPage = response.data.size;
        this.numberOfItems = response.data.numberOfElements;
      } else {
        this.showPages = false;
        this.contacts = null;
      }

    });
  }

  pageChanged(page: number): void {
    this.page = page;
    if (this.Div) {
      this.listAffaire();
    } else {
      this.listContacts();
    }
  }

  showPop(template: TemplateRef<any>) {
    this.modelRef = this.modelService.show(template, this.config);
  }

  clearFormCantact() {
    this.formContact.controls.nom.setValue('');
    this.formContact.controls.prenom.setValue('');
    this.formContact.controls.tel.setValue('');
    this.formContact.controls.email.setValue('');
    this.formContact.controls.description.setValue('');
    this.croppedImage = 'data:image/png;base64,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';
    this.formContact.controls.main.setValue(false);
    this.formContact.controls.job.setValue('');
  }

  showPopContact(template: TemplateRef<any>, n: number, n1: number) {
    this.n1 = n1;
    this.idC = n;
    if (n1 === 2) {
      this.customerService.getContactid(n).subscribe(response => {
        this.contact = response.data;
        this.formContact.controls.nom.setValue(this.contact.contactFirstName);
        this.formContact.controls.prenom.setValue(this.contact.contactLastName);
        this.formContact.controls.tel.setValue(this.contact.contactMobileNo);
        this.formContact.controls.email.setValue(this.contact.contactEmail);
        this.formContact.controls.description.setValue(this.contact.contactAbout);
        this.formContact.controls.main.setValue(this.contact.contactIsMain);
        this.formContact.controls.job.setValue(this.contact.contactJob);
        this.croppedImage = 'data:image/png;base64,' + this.contact.contactAvatar;
      });
    }
    this.modelRef = this.modelService.show(template, this.config);
  }

  deleteC() {
    this.customerService.deleteCustomer(this.id).subscribe(response => {
      this.router.navigate([`/listCustomer`]);
      this.modelRef.hide();
    });
  }

  addContact() {
    this.contact = new Contact();
    this.contact.contactFirstName = this.formContact.controls.nom.value;
    this.contact.contactLastName = this.formContact.controls.prenom.value;
    this.contact.contactEmail = this.formContact.controls.email.value;
    this.contact.contactMobileNo = this.formContact.controls.tel.value;
    this.contact.contactAbout = this.formContact.controls.description.value;
    this.contact.contactIsMain = this.formContact.controls.main.value;
    this.contact.contactJob = this.formContact.controls.job.value;
    this.contact.customerId = this.idC;
    this.contact.contactAvatar = this.croppedImage.split(',')[1];
    /*
    const conta = {
    contactFirstName : this.formContact.controls.nom.value,
    contactLastName : this.formContact.controls.prenom.value,
    contactEmail : this.formContact.controls.email.value,
    contactMobileNo : this.formContact.controls.tel.value,
    contactAbout : this.formContact.controls.description.value,
    contactIsMain : this.formContact.controls.main.value,
    contactJob : this.formContact.controls.job.value,
    customerId : this.idC
    };*/
    this.customerService.addContact(this.contact).subscribe(response => {
      this.toastrService.success('Contact ajouté', 'CONTACT', {
        timeOut: 2000,
      });
      this.modelRef.hide();
      this.listContacts();
    });
  }

  deleteContact() {
    this.customerService.deleteContact(this.idC).subscribe(response => {
      this.listContacts();
      this.toastrService.warning('Contact supprimé', 'CONTACT', {
        timeOut: 2000,
      });
      this.modelRef.hide();
    });
  }

  editContact() {
    this.contact.id = this.idC;
    this.contact.contactFirstName = this.formContact.controls.nom.value;
    this.contact.contactLastName = this.formContact.controls.prenom.value;
    this.contact.contactEmail = this.formContact.controls.email.value;
    this.contact.contactMobileNo = this.formContact.controls.tel.value;
    this.contact.contactAbout = this.formContact.controls.description.value;
    this.contact.contactIsMain = this.formContact.controls.main.value;
    this.contact.contactJob = this.formContact.controls.job.value;
    this.contact.contactAvatar = this.croppedImage.split(',')[1];

    this.customerService.editContact(this.idC, this.contact).subscribe(response => {
      this.listContacts();
      this.toastrService.success('Contact modifié', 'CONTACT', {
        timeOut: 2000,
      });
      this.modelRef.hide();
    });
  }

  testTime() {
    let max = 90;
    let observer = interval(100).pipe(takeWhile(() => this.li < max))
      .subscribe(() => {
        this.li++;
        console.log('hello', this.li);
      });
  }
}
