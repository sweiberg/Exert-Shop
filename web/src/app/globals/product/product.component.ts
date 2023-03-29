import {Component, EventEmitter, Input} from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Product} from '../../schema/product.schema';
import {AppComponent} from '../../app.component';
@Component({
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'],
  selector: 'product',
})

export class ProductComponent {
  faShoppingCart = faShoppingCart;
  @Input() product: Product;

  constructor(private appComponent: AppComponent) {
  }

  addToCart(product: Product) {
    //Add product ID to local storage as array
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    //Check if product is already in cart
    if (cart.includes(product.id)) {
      alert('Product is already in cart')
      return;
    }
    cart.push(product.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.appComponent.cartLength = cart.length;
  }
}
