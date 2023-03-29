import {Component} from '@angular/core';
import {Product} from "../../schema/product.schema";
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({templateUrl: 'add.product.html'})
export class AddProductComponent {
  title: string;
  form: FormGroup;
  constructor(private route:ActivatedRoute, private router:Router, public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: new FormControl('', []),
      originalPrice: new FormControl('', []),
      finalPrice: new FormControl('', []),
      description: new FormControl('', []),
      category: new FormControl('', []),
      tag: new FormControl('', []),
      imgURL: new FormControl('', []),
    });
  }
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

  constructAndTrimJSON(){
    let updatedForm = {
      name: this.product.name,
      finalPrice: this.product.finalPrice,
      originalPrice: this.product.originalPrice,
      categoryID: 0,
      tags: [this.product.tag],
      imageURL: this.product.imgURL,
      description: this.product.description
    }
    return JSON.stringify(updatedForm);
  }

  onSubmit(){
    let form = this.constructAndTrimJSON();
    console.log(form)
    let JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYXQiOjE2ODAwNzE4MjcsImlhdCI6MTY4MDA2OTgyNywiaWQiOjN9.6okYeQU2Mr7NBqMmreWTXvWwDHvMndU5w0W-u-NGq8M';
    return this.http.post('http://localhost:4300/api/addproduct', form, {
      headers: { 'Content-Type': 'application/json', 'Authorization': JWT }, responseType: 'json', observe: 'response'
    })
      .subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/admin/add_product']);
        },
        error: (error) => console.log(error),
      });
  }
}
