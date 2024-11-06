import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RequestsService} from "../../shared/services/requests.service";
import {OrderType} from "../../types/order.type";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public showForm: boolean = true;
  public orderError: boolean = false;

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
              private activatedRoute: ActivatedRoute,
              private requestService: RequestsService) {}

  get product() {return this.orderForm.get('product')};
  get personalName() {return this.orderForm.get('personalInfo')?.get('name')};
  get personalLastName() {return this.orderForm.get('personalInfo')?.get('last_name')};
  get personalPhone() {return this.orderForm.get('personalInfo')?.get('phone')};
  get addressInfo() {return this.orderForm.get('addressInfo')?.get('address')};
  get addressCountry() {return this.orderForm.get('addressInfo')?.get('country')};
  get addressZip() {return this.orderForm.get('addressInfo')?.get('zip')};
  get comment() {return this.orderForm.get('comment')};

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['product']) {
        this.orderForm.patchValue({product: params['product']})
        this.orderForm.controls['product'].disable();
      }
    })
  }

  createOrder() {
    const orderInfo: OrderType = {
      name: this.personalName?.value ? this.personalName.value : '',
      last_name: this.personalLastName?.value ? this.personalLastName.value : '',
      phone: this.personalPhone?.value ? this.personalPhone.value : '',
      country: this.addressCountry?.value ? this.addressCountry.value : '',
      zip: this.addressZip?.value ? this.addressZip.value : '',
      product: this.product?.value ? this.product.value : '',
      address: this.addressInfo?.value ? this.addressInfo.value : ''
    }

    if (this.orderForm.get('comment')?.value) {
      orderInfo.comment = this.comment?.value ? this.comment?.value : '';
    }

    this.requestService.sendOrder(orderInfo)
      .subscribe( {
        next: response => {
          if (response.success && !response.message) {
            this.orderForm.reset();
            this.showForm = false;
          } else {
            this.orderError = true;
          }
        },
        error: err => {
          this.orderError = true;
          console.log(err);
        }
    })
  }
}
