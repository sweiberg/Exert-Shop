import {Component} from '@angular/core';
import {Product} from "../../schema/product.schema";
import {FormControl} from '@angular/forms';

@Component({templateUrl: 'add.product.html'})
export class AddProductComponent {
  defaultInfo = {
    name: 'Sample Product',
    finalPrice: 0,
    originalPrice: 100,
    description: 'This is a sample product description, this product is extremely samply and you can sample it well.',
    category: 'SAMPLE, CATEGORY',
    tag: '',
    imgURL: 'https://i.imgur.com/6fSIwvt.png'
  }
  name = new FormControl('');
  originalPrice = new FormControl('');
  finalPrice = new FormControl('');
  description = new FormControl('');
  category = new FormControl('');
  tag = new FormControl('');
  imgURL = new FormControl('');

  product = new Product(this.defaultInfo.name, this.defaultInfo.finalPrice,
    this.defaultInfo.originalPrice, this.defaultInfo.category, this.defaultInfo.tag, this.defaultInfo.imgURL, this.defaultInfo.description);

  nameSubscription = this.name.valueChanges.subscribe((value) => {
    this.product.name = value ?? this.defaultInfo.name;
  });

  originalPriceSubscription = this.originalPrice.valueChanges.subscribe((value) => {
    let price = this.defaultInfo.originalPrice;
    if (!isNaN(Number(value ?? ''))) {
      price = Number(value ?? '');
    }
    this.product.originalPrice = price;
  });

  finalPriceSubscription = this.finalPrice.valueChanges.subscribe((value) => {
    let price = this.defaultInfo.finalPrice;
    if (!isNaN(Number(value ?? ''))) {
      price = Number(value ?? '');
    }
    this.product.finalPrice = price;
  });

  descriptionSubscription = this.description.valueChanges.subscribe((value) => {
    this.product.description = value ?? this.defaultInfo.description;
  });

  categorySubscription = this.category.valueChanges.subscribe((value) => {
    this.product.category = value ?? this.defaultInfo.category;
  });

  tagSubscription = this.tag.valueChanges.subscribe((value) => {
    this.product.tag = value ?? this.defaultInfo.tag;
  });

  imgURLSubscription = this.imgURL.valueChanges.subscribe((value) => {
    this.product.imgURL = value ?? this.defaultInfo.imgURL;
  });

}
