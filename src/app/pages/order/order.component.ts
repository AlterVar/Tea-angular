import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm = this.fb.group({
    product: [''],
    personalInfo: this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{11}$')]],
    }),
    addressInfo: this.fb.group({
      country: ['', Validators.required],
      zip: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я\\d\\s\\-/]+$')]],
    }),
    comment: [''],
  })

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,) {}

  get personalName() {return this.orderForm.get('personalInfo')?.get('name')};
  get personalLastName() {return this.orderForm.get('personalInfo')?.get('last_name')};
  get personalPhone() {return this.orderForm.get('personalInfo')?.get('phone')};
  get addressInfo() {return this.orderForm.get('addressInfo')?.get('address')};
  get addressCountry() {return this.orderForm.get('addressInfo')?.get('country')};
  get addressZip() {return this.orderForm.get('addressInfo')?.get('zip')};

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['product']) {
        this.orderForm.patchValue({product: params['product']})
        this.orderForm.controls['product'].disable();
      }
    })
  }

  createOrder() {

  }
}
