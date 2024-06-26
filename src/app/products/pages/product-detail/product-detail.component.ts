import { Component, Input, inject, signal } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductDetail } from '../../../shared/models/productDetail';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterLinkWithHref } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  id:any;
  product = signal<ProductDetail | null>(null);
  cover = signal('');
  private productService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  durationInSeconds = 3;
  private _snackBar= inject(MatSnackBar);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params)=>{
      if(params['id']){
        this.id = params['id'] ;
      }
    });
    if (this.id) {
      this.productService.getProduct(this.id)
      .subscribe({
        next: (product) =>{
          this.product.set(product[0]);
          if (product[0].features.img.length > 0) {
            this.cover.set(product[0].features.img[0]);
          }
        },
        error: (e)=>{
          console.log(e);
        }
      })
    }
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
      
    this.openSnackBar(product.name);
    }
  }

  openSnackBar(message:string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: {message:`Added ${message}`,icon:1},
      panelClass: ['custom-snackbar']
    });
  }
}
