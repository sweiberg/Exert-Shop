import {Component, Input} from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Product} from '../../schema/product.schema';
@Component({
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'],
  selector: 'product',
})

export class ProductComponent {
  faShoppingCart = faShoppingCart;
  @Input() product: Product;

  addToCart(product: Product) {
    console.log(product);
  }
}
