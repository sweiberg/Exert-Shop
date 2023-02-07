import {Component} from '@angular/core';
import {Product} from "../schema/product.schema";

@Component({
  templateUrl: 'product.home.component.html',
})
export class ProductHomeComponent{
  productList:Product[] = [];
  constructor(){
    // This will be replaced by a call to the backend to get the products
    for(let i = 0; i < 10; i++){
      let product = new Product('Sample Product', 100, 200, 'SAMPLE, CATEGORY', 'SALE', 'https://i.imgur.com/6fSIwvt.png', 'This is a sample product description, this product is extremely samply and you can sample it well.');
      this.productList.push(product);
    }
  }
}
