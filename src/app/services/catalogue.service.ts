import { environment } from '@environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Produit } from '../models/produit.model';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {


  constructor(private httpClient: HttpClient) { }

  getProducts(page: number, size: number): Observable<any> {
    console.log('Appel du service getProducts()');
    return this.httpClient.get<any>(environment.serverUrl + 'produits?page=' + page + '&size=' + size).pipe(
      catchError(this.handleError)
    );
  }

  getProductsByKeyWord(key: string, page: number, size: number): Observable<any> {
    console.log('Appel du service getProductsByKeyWord()');
    const url = environment.serverUrl + 'produits/search/byDesignationPage?des=' + key + '&page=' + page + '&size=' + size;
    console.log('url : ' + url);
    return this.httpClient.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getProductByUrl(url: string): Observable<any> {
    console.log('Appel du service getProductByUrl()');
    console.log('url : ' + url);
    return this.httpClient.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(url: string): Observable<any> {
    console.log('Appel du service deleteProduct()');
    return this.httpClient.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  createProduct(data: any): Observable<any> {
    console.log('Appel du service createproduct()');
    const url = environment.serverUrl + 'produits';
    console.log('données à ajouter : ' + data);
    return this.httpClient.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(url: string, data: any): Observable<any> {
    console.log('Appel du service upadateProduct()');
    console.log('url : ' + url);
    return this.httpClient.put<any>(url, data).pipe(
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
