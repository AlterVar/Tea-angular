import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
      {path: 'order', loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule)},
      {path: 'catalog', loadChildren: () => import('./features/catalog/catalog.module').then(m => m.CatalogModule)}
    ]
  },
  {path: 'products', redirectTo: 'catalog'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
