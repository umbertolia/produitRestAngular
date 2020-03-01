import { RouterModule, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CatalogueService } from '../services/catalogue.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm: FormGroup;
  product = { id: '', designation: 'Désignation', price: 0.00, quantite: 0 };
  private state$: Observable<object>;
  modeUpdate = false;
  url: string;

  constructor(
    private productFormBuilder: FormBuilder,
    private catalogueService: CatalogueService,
    private route: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(this.activatedRoute);
      this.url = params.get('data');
      console.log('url : ' + atob(this.url));
      if (this.url) {
        this.catalogueService.getProductByUrl(atob(this.url)).subscribe(data => {
          this.product = data;
          this.modeUpdate = true;
          console.log('data : ' + data);
        }, err => {
          console.log('Problème lors de la récup du produit');
        });
      }
  });
  }

  initForm() {
    this.productForm = this.productFormBuilder.group(
      {
        designation: ['', [Validators.required, Validators.pattern(/[a-zA-Z]/), ]],
        price: [0, [Validators.required, Validators.pattern(/^\d+[\.]?\d+?$/)]],
        quantite: [0, [Validators.required, Validators.pattern(/^[+]?\d*$/)]]
      });
  }


  onSubmit() {
    console.log('design : ' + this.product.designation);

    switch (this.modeUpdate) {
      case (true) : {
        this.catalogueService.updateProduct(this.url, this.product).subscribe(
          data => {
            console.log('Produit ajouté');
            this.route.navigateByUrl('products');
          }, error => {
            console.log('Problème lors de l\'ajout du produit');
          });
      }             break;

      case (false) : {
        this.catalogueService.createProduct(this.product).subscribe(
          data => {
            console.log('Produit ajouté');
            this.route.navigateByUrl('products');
          }, error => {
            console.log('Problème lors de l\'ajout du produit');
          });
      }              break;
    }
  }

}
