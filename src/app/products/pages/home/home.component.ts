import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../../shared/models/product';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { CartService } from '../../../shared/services/cart.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoriesComponent, ProductComponent, PaginatorComponent,MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productService =inject(ProductsService);
  products=signal<Product[]>([]);
  productsFilter= signal<Product[]>([]);
  pageSize = this.productService.pageSize; 
  pageNumber = signal(1);
  pageTotal = signal(0);
  name = signal("");
  categories = signal([0]);
  maxPrice = 0;
  private cartService = inject(CartService);
  durationInSeconds = 3;
  private _snackBar= inject(MatSnackBar);

  ngOnInit(){
    this.productService.getProducts().subscribe({
      next:(data)=>{
        this.maxPrice = Math.max(...data.map(o => +o.price));
        this.productService.products.set(data);
        this.productService.productsFilterName.set(data);
        this.productService.filterDataByPage(this.pageNumber());
        this.productService.pageTotal.set(Math.ceil(this.products().length / this.pageSize));
        this.productService.filterDataByPrice(0,this.maxPrice);
        this.productService.filterDataByCategory([0]);
        this.productService.filterDataByName("");
        
        this.setValues();
      },
      error:(e)=>{
        console.log(e);
      }
    });
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.openSnackBar(product.name);
  }

  onPageChange(pageNumber: number): void {
    this.filterData(pageNumber);
  }

  filterData(pageNumber: number){
    this.productService.filterDataByPage(pageNumber);
    this.productsFilter.set(this.productService.productsFilterPage());
    this.pageNumber.set(this.productService.pageNumber());
  }
  searchName(name:any){
    this.name.set(name);
    this.productService.filterDataByName(name);
    this.setValues();
  }

  searchCategories(id:Array<number>){
    this.categories.set(id);
    this.productService.filterDataByCategory(id);
    this.productService.filterDataByName(this.name());
    this.setValues();
  }

  searchPrice(priceRange:Array<number>){
    this.productService.filterDataByPrice(+priceRange[0],+priceRange[1]);
    this.productService.filterDataByCategory(this.categories());
    this.productService.filterDataByName(this.name());
    this.setValues();
  }

  setValues(){
    this.productsFilter.set(this.productService.productsFilterPage());
    this.pageNumber.set(this.productService.pageNumber());
    this.pageTotal.set(this.productService.pageTotal());
    this.products.set(this.productService.productsFilterName());
  }
  
  openSnackBar(message:string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: {message:`Added ${message}`,icon:1},
      panelClass: ['custom-snackbar']
    });
  }
}
