import { Produit } from './../models/produit.model';
import { CatalogueService } from './../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  products: any;
  size = 5;
  currentPage = 0;
  totalPages: number;
  pages: number[];
  currentKeyWord = '';

  constructor(private catalogueService: CatalogueService) { }

  ngOnInit() {

  }

  onGetProducts() {
    if (this.currentKeyWord) {
      this.currentKeyWord = '';
    }
    this.catalogueService.getProducts(this.currentPage, this.size)
      .subscribe(data => {
        this.products = data;
        this.totalPages = data['page'].totalPages;
        this.pages = new Array(this.totalPages);
      }, err => {
        console.log('Problème lors de la récup des produits');

      });
  }

  onGetProductsFromPage(page: number) {
    this.currentPage = page;
    this.onFindProduct();
  }

  onFindWithKeyWord(form: any) {
    this.currentPage = 0;
    this.currentKeyWord = form.keyword;
    this.onFindProduct();
  }

  onFindProduct() {
    this.catalogueService.getProductsByKeyWord(this.currentKeyWord, this.currentPage, this.size)
      .subscribe(data => {
        this.products = data;
        this.totalPages = data['page'].totalPages;
        this.pages = new Array(this.totalPages);
      }, err => {
        console.log('Problème lors de la récup des produits');
      });
  }

  onDeleteProduct(produit: any) {
    const confirm = window.confirm('Etes-vous sûr ? ');
    if (confirm) {
      this.catalogueService.deleteProduct(produit._links.self.href).subscribe(data => {
        this.onFindProduct();
      }, err => {
        console.log('Problème lors de la suppression');
      });
    }

  }

}
