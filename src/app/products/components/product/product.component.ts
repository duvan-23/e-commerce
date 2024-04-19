import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input ({required: true}) product!: Product;

  @Output () addToCart = new EventEmitter();

  addToCartHandler () {
    // console.log('Click from child');
    this.addToCart.emit(this.product)
  }
}
