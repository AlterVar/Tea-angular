import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestsService} from "../../services/requests.service";
import {ProductType} from "../../types/product.type";
import {Router} from "@angular/router";

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  public products: ProductType[] = [];
  public productsBoolean: boolean = true;

  constructor(private request: RequestsService,
              private router: Router) { }

  ngOnInit(): void {
    this.request.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: err => {
        console.log('Ошибка при загрузке продуктов: ' + err);
        alert('Возникла ошибка при загрузке каталога продуктов. Обратитесь в поддержку');
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy() {

  }

}
