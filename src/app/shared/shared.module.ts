import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CutDescriptionPipe} from "./pipes/cut-description.pipe";
import {ProductCardComponent} from "./product-card/product-card.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    CutDescriptionPipe,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CutDescriptionPipe,
    ProductCardComponent,
  ]
})
export class SharedModule { }
