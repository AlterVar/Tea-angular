import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RequestsService} from "../../../shared/services/requests.service";
import {ProductType} from "../../../types/product.type";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: ProductType;

  constructor(private activatedRoute: ActivatedRoute,
              private requestService: RequestsService,
              private router: Router) {
    this.product = {
      title: '',
      description: '',
      price: 0,
      id: 0,
      image: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']) {
        this.requestService.getProduct(params['id']).subscribe({
          next: (data) => {
            console.log(data);
            this.product = data;
          },
          error: err => {
            console.log('Ошибка при загрузке продукта ' + err)
            this.router.navigate(['/'])
          }
        })
      }
    })
  }
}
