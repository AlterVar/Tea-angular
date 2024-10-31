import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm = this.fb.group({
    product: ['', Validators.required],
    personalInfo: this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
    }),
    addressInfo: this.fb.group({
      country: ['', Validators.required],
      zip: ['', Validators.required],
      address: ['', Validators.required],
    }),
    comment: ['', Validators.required],
  })

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['product']) {
        this.orderForm.patchValue({product: params['product']})
      }
    })
  }
}
