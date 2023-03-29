import {Component, Input} from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Product} from '../../schema/product.schema';
import {AppComponent} from '../../../app/app.component';
@Component({
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'],
  selector: 'product',
})

export class ProductComponent {
  faShoppingCart = faShoppingCart;
  @Input() product: Product;

  addToCart(product: Product) {
    if(product.id!=null||product.id!=undefined){
      let productID = product.id;
      let productIDList = JSON.parse(localStorage.getItem('productIDList') ?? '[]');
      productIDList.push(productID);
      localStorage.setItem('productIDList', JSON.stringify(productIDList));
      console.log("Product ID added to local storage");
    }else{
      console.log("Product ID is null or undefined");
    }
    AppComponent.prototype.updateCartLength();
  }
}
