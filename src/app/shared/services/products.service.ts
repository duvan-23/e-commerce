import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';
import { ProductDetail } from '../models/productDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  http = inject(HttpClient);
  url = "https://e-commerce-back-node-production.up.railway.app/";

  getProducts(){
    return this.http.get<Product[]>(`${this.url}products`);
  }

  getProduct(id:string){
    return this.http.get<ProductDetail[]>(`${this.url}products/${id}`);
  }
}
