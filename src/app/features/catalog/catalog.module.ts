import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import {ProductComponent} from "./product/product.component";
import {ProductsComponent} from "./products/products.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CatalogRoutingModule,
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class CatalogModule { }
