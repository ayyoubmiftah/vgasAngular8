import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../services/profile.service';
import {CustomervModel} from '../../../models/customerv.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessModel} from '../../../models/business.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-affaire',
  templateUrl: './add-affaire.component.html',
  styleUrls: ['./add-affaire.component.scss']
})
export class AddAffaireComponent implements OnInit {
  customer: Array<CustomervModel>;
  id: number;
  id2: number;
  b: boolean;
  affaire: BusinessModel;
  affaireForm;

  constructor(private customerService: ProfileService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location,
              private toastrService: ToastrService) {
    this.affaireForm = this.formBuilder.group({
      title: ['', Validators.required],
      client: ['', Validators.required],
      date: ['', Validators.required],
      duree: ['', Validators.required],
      cap: ['', Validators.required],
      car: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.customerService.getCustomer().subscribe(response => {
      this.customer = response.data;
    });
    this.id = this.route.snapshot.params['id'];
    this.id2 = this.route.snapshot.params['id2'];
    if (this.id > 0) {
      this.customerService.getAid(this.id).subscribe(response => {
        this.affaire = response.data;
        this.affaireForm.controls.title.setValue(this.affaire.businessTitle);
        this.affaireForm.controls.car.setValue(this.affaire.realTurnover);
        this.affaireForm.controls.cap.setValue(this.affaire.potentialTurnover);
        this.affaireForm.controls.desc.setValue(this.affaire.businessAbout);
        this.affaireForm.controls.date.setValue(this.affaire.businessEstimatedDate);
        this.affaireForm.controls.duree.setValue(this.affaire.businessDuration);
        this.affaireForm.controls.client.setValue(this.affaire.customerById.id);
      });
    } else {
      console.log('d5al else');
    }
  }

  addAffaire() {
    const affaire = {
      id: Number(this.id),
      businessTitle: this.affaireForm.controls.title.value,
      realTurnover: this.affaireForm.controls.car.value,
      potentialTurnover: this.affaireForm.controls.cap.value,
      businessAbout: this.affaireForm.controls.desc.value,
      businessEstimatedDate: this.affaireForm.controls.date.value,
      // businessStartDate: '2019-06-12',
      customerId: Number(this.affaireForm.controls.client.value)
      // businessStatusByBusinessStatusId: {id: 1}
    };
    if (this.id == null || this.id === 0) {
      if (!this.testid2isnull()) {
        affaire.customerId = this.id2;
        console.log('d5al if');
        console.log(affaire);
      }
      this.customerService.addBusiness(affaire).subscribe(response => {
        this.toastrService.success('Affaire ajouté', 'Affaire', {
          timeOut: 3000,
        });
        console.log(response.data);
        this.router.navigate(['/listAffaire']);
      }, err => {
        console.log(err.toString());
      });
    } else {
      this.customerService.editBusiness(this.id, affaire).subscribe(response => {
        this.toastrService.success('Affaire Modifié', 'Affaire', {
          timeOut: 3000,
        });
        console.log(response.data);
        this.router.navigate(['/listAffaire']);
      }, err => {
        console.log(err.toString());
      });
    }
  }

  testid2isnull(): boolean {
    if (this.id2 == null) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.location.back();
  }
}
