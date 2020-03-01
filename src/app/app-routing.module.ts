import { environment } from '@environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {path: environment.path_getProducts, component: ProduitsComponent},
  {path: environment.path_createProduct, component: NewProductComponent},
  {path: environment.path_createProductWithParam, component: NewProductComponent},
  {path: '', redirectTo: environment.path_getProducts, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
