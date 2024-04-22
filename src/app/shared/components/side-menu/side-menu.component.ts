import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import {MatDividerModule} from '@angular/material/divider';
import { SnackBarComponent } from '../../../products/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  durationInSeconds = 3;
  private _snackBar= inject(MatSnackBar);
  
  toggleSideMenu(){
    this.toggle.emit();
  }
  
  removeCart(product:Product){
    this.cartService.removeToCart(product);
    this.openSnackBar(product.name);
  }

  openSnackBar(message:string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: {message:`Removed ${message}`,icon:2},
      panelClass: ['custom-snackbar']
    });
  }
}
