import { Component, inject, signal } from '@angular/core';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../../shared/models/product';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoriesComponent, ProductComponent, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productervice =inject(ProductsService);
  products= signal<Product[]>([]);
  productsFilter= signal<Product[]>([]);
  pageSize = 9; 

  ngOnInit(){
    this.productervice.getProducts().subscribe({
      next:(data)=>{
        this.products.set(data);
        this.productsFilter.set(data);
        this.filterData(1);
      },
      error:(e)=>{
        console.log(e);
      }
    });
  }

  addToCart(product: Product) {
    // console.log(product);
    // this.cartService.addToCart(product);
  }

  onPageChange(pageNumber: number): void {
    this.filterData(pageNumber);
  }

  filterData(pageNumber: number){
    let num = this.products().length;
    let data= [];
    for (let index = 0; index < num; index++) {
      if(index < (pageNumber*this.pageSize) && ((index>=((pageNumber*this.pageSize)-this.pageSize))|| ((pageNumber*this.pageSize)-this.pageSize)<1)){
        data.push(this.products()[index]);
      }
    }
    this.productsFilter.set(data);
  }
}
