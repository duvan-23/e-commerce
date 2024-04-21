import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  http = inject(HttpClient);
  url = "https://e-commerce-back-node-production.up.railway.app/";

  getCategories(){
    return this.http.get<Category[]>(`${this.url}category`);
  }
}
