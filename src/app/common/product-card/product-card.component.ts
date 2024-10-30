import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  public _product: ProductType;

  @Input()
  get product(): ProductType {return this._product};
  set product(param: ProductType) {
    this._product = param;
  }
  constructor() {
    this._product = {
      image: '',
      title: '',
      description: '',
      price: 0,
      id: 0
    }
  }

  ngOnInit(): void {
  }

}
