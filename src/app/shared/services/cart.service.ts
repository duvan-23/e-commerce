import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);
  total = computed(()=>{
    const cart = this.cart();
    return cart.reduce((total, product) => total + (+product.price), 0);
  })

  addToCart(product: Product) {
    this.cart.update(state => [...state, product])
  }
  removeToCart(product: Product) {
    const index = this.cart().findIndex(item => item.id === product.id);
    if (index !== -1) {
      const updatedCart = this.cart().filter((item, i) => i !== index);
      this.cart.set(updatedCart);
    }
  }
}
