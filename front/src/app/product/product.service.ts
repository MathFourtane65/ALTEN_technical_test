import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'assets/products.json';
  private products: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.getAll().subscribe(data => this.products = data.data);
  }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  getById(id: number): Observable<any> {
    return of(this.products.find(product => product.id === id));
  }

  create(product: any): Observable<any> {
    const newId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    product.id = newId;
    this.products.push(product);
    return of(product);
  }

  update(id: number, updatedProduct: any): Observable<any> {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      return of(this.products[index]);
    }
    return of(null);
  }

  delete(id: number): Observable<any> {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      return of(deletedProduct);
    }
    return of(null);
  }
}
