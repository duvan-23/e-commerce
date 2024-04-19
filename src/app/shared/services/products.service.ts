import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  http = inject(HttpClient);
  url = "https://e-commerce-back-node-production.up.railway.app/";
  
  getProducts(){
    return this.http.get<Product[]>(`${this.url}products`);
  }
}
