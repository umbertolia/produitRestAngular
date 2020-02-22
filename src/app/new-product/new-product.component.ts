import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm: FormGroup;
  product = { designation: 'Désignation', price: 0.00, quantite: 0 };



  constructor(
    private productFormBuilder: FormBuilder,
    private catalogueService: CatalogueService,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = this.productFormBuilder.group(
      {
        designation: ['', [Validators.required, Validators.pattern(/[a-zA-Z]/),]],
        price: [0, [Validators.required, Validators.pattern(/^\d+[\.]?\d+?$/)]],
        quantite: [0, [Validators.required, Validators.pattern(/^[+]?\d*$/)]]
      });
  }


  onSubmit() {
    console.log('design : ' + this.product.designation);
    // var myString = JSON.stringify(myJSON);
    this.catalogueService.createProduct(this.product).subscribe(
      data => {
        console.log('Produit ajouté');
        this.router.navigateByUrl('products');
      }, error => {
        console.log('Problème lors de l\'ajout du produit');
      });

  }

}
