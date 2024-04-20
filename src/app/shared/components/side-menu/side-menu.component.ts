import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ MatDividerModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  @Input({required:true}) sideMenu!:boolean ;
  @Output() toggle = new EventEmitter();
  private cartService = inject(CartService)
  cart = this.cartService.cart;
  total = this.cartService.total;
  selected= false;
  toggleSideMenu(){
    this.toggle.emit();
  }
  
  removeCart(product:Product){
    this.cartService.removeToCart(product);
  }

}
