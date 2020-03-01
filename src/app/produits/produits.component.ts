import { Router } from '@angular/router';
import { Produit } from './../models/produit.model';
import { CatalogueService } from './../services/catalogue.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs';
import { environment } from '@environment';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit, OnDestroy {

  products: any;
  size = 5;
  currentPage = 0;
  totalPages: number;
  pages: number[];
  currentKeyWord = '';
  routeSubscriber: any;

  constructor(
    private catalogueService: CatalogueService,
    private router: Router) { }

  ngOnInit() {
    this.onGetProducts();
  }

  onGetProducts() {
    if (this.currentKeyWord) {
      this.currentKeyWord = '';
    }
    this.routeSubscriber = this.catalogueService.getProducts(this.currentPage, this.size)
      .subscribe(data => {
        this.products = data;
        this.totalPages = data[environment.stringPage].totalPages;
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
        this.totalPages = data[environment.stringPage].totalPages;
        this.pages = new Array(this.totalPages);
      }, err => {
        console.log('Problème lors de la récup des produits');
      });
  }

  onUpdateProduct(produit: any) {
    // on se dirige vers le composant new-product en lui passant les données
    const url = environment.path_createProduct + '/' + btoa(produit._links.self.href);
    console.log('url update : ' + url);
    this.router.navigateByUrl(url).then(retourOK => {
      if (retourOK) {
        console.log('Appel du composant NewProductComponent OK');
      } else {
        console.log('Appel du composant NewProductComponent KO');
      }
    });
  }

  onDeleteProduct(produit: any) {
    const confirm = window.confirm('Etes-vous sûr ? ');
    if (confirm) {
      this.catalogueService.deleteProduct(produit._links.self.href).subscribe(data => {
        // on check si le produit etait le seul sur sa page
        // si c le cas la page actuelle sera la page précédente
        const nbrProduitsPageEnCours = this.products._embedded.produits.length;
        if (nbrProduitsPageEnCours === 1 && this.currentPage > 0) {
          this.currentPage--;
        }
        this.onFindProduct();
      }, err => {
        console.log('Problème lors de la suppression');
      });
    }
  }

  ngOnDestroy() {
    this.routeSubscriber.unsubscribe();
  }

}
