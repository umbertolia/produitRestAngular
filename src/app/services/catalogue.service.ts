import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Produit } from '../models/produit.model';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  host = 'http://localhost:8080/catalogue/';

  constructor(private httpClient: HttpClient) { }

  getProducts(page: number, size: number) {
    console.log('Appel du service getProducts()');
    return this.httpClient.get<any>(this.host + 'produits?page=' + page + '&size=' + size).pipe(
      catchError(this.handleError)
    );
  }

  getProductsByKeyWord(key: string, page: number, size: number) {
    console.log('Appel du service getProductsByKeyWord()');
    const url = this.host + 'produits/search/byDesignationPage?des=' + key + '&page=' + page + '&size=' + size;
    console.log('url : ' + url);
    return this.httpClient.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(url: string) {
    console.log('Appel du service deleteProduct()');
    return this.httpClient.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
