import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { ProductDetail } from '../models/productDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  http = inject(HttpClient);
  url = "https://e-commerce-back-node-production.up.railway.app/";


  products= signal<Product[]>([]);
  productsFilterPrice= signal<Product[]>([]);
  productsFilterCategory= signal<Product[]>([]);
  productsFilterName= signal<Product[]>([]);
  productsFilterPage= signal<Product[]>([]);
  pageSize = 9; 
  pageNumber = signal(1);
  pageTotal = signal(0);

  getProducts(){
    return this.http.get<Product[]>(`${this.url}products`);
  }

  getProduct(id:string){
    return this.http.get<ProductDetail[]>(`${this.url}products/${id}`);
  }

  setProducts(products: Product[]){
    this.products.set(products);
  }

  filterDataByPage(pageNumber: number){
    this.pageNumber.set(pageNumber);
    let num = this.productsFilterName().length;
    let data= [];
    for (let index = 0; index < num; index++) {
      if(index < (pageNumber*this.pageSize) && ((index>=((pageNumber*this.pageSize)-this.pageSize))|| ((pageNumber*this.pageSize)-this.pageSize)<1)){
        data.push(this.productsFilterName()[index]);
      }
    }
    this.productsFilterPage.set(data);
  }

  filterDataByName(name:string){
    let num = this.productsFilterCategory().length;
    let data= [];
    for (let index = 0; index < num; index++) {
      if(this.productsFilterCategory()[index].name.toLowerCase().includes(name.toLowerCase())){
        data.push(this.productsFilterCategory()[index]);
      }
    }
    this.productsFilterName.set(data);
    this.filterDataByPage(1);
    this.pageTotal.set(Math.ceil(this.productsFilterName().length / this.pageSize));
  }

  filterDataByCategory(id:Array<number>){
    let num = this.productsFilterPrice().length;
    let data= [];
    for (let index = 0; index < num; index++) {
      if(id.includes(this.productsFilterPrice()[index].id_category) || id[0] == 0){
        data.push(this.productsFilterPrice()[index]);
      }
    }
    this.productsFilterCategory.set(data);
  }
  filterDataByPrice(minPrice:number, maxPrice:number){
    let num = this.products().length;
    let data= [];
    for (let index = 0; index < num; index++) {
      if(this.products()[index].price >= minPrice &&  this.products()[index].price <=maxPrice){
        data.push(this.products()[index]);
      }
    }
    this.productsFilterPrice.set(data);
  }

  
}
