import {Component, OnInit} from '@angular/core';
import {Product} from "../../schema/product.schema";
import {Category} from "../../schema/category.schema";
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add_category'

@Component({templateUrl: 'add.product.html', styleUrls: ['./add.product.css']} )
export class AddProductComponent implements OnInit {
  title: string;
  form: FormGroup;
  catList: Category[];
  selectedValue: number;

  constructor( private router:Router, public fb: FormBuilder, private http: HttpClient, private productService: ProductService, public dialog: MatDialog) {
    this.form = this.fb.group({
      name: new FormControl('', []),
      originalPrice: new FormControl('', []),
      finalPrice: new FormControl('', []),
      description: new FormControl('', []),
      category: new FormControl('', []),
      categoryID: new FormControl('', []),
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
    categoryID: 1,
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
    this.defaultInfo.originalPrice, this.defaultInfo.category, this.defaultInfo.tag, this.defaultInfo.imgURL, this.defaultInfo.description, this.defaultInfo.categoryID);

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

  ngOnInit() {
    this.onGetCat();
  }

  changeCategory() {
    console.log(this.selectedValue);
  }

  constructAndTrimJSON(){
    let updatedForm = {
      name: this.product.name,
      finalPrice: this.product.finalPrice,
      originalPrice: this.product.originalPrice,
      quantity: 1,
      tags: [this.product.tag],
      imageURL: this.product.imgURL,
      description: this.product.description,
      categoryID: this.selectedValue
    }
    return JSON.stringify(updatedForm);
  }

  onGetCat() {
    this.catList = new Array();

    this.productService.getCategories()    
    .subscribe({
      next: (response) => {
        //console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          const id = response.data[i].ID;
          const name = response.data[i].name;
          const catItem = new Category(id, name);
          this.catList.push(catItem);
        }
      }, 
      error: (error) => {
        console.log(error);
      }
    });

    console.log(this.catList);
  }

  onAddCat() {
      let dialogRef = this.dialog.open(AddCategoryComponent);
      this.onGetCat();
      console.log(JSON.stringify(this.catList));
  }

  onSubmit(){
    let form = this.constructAndTrimJSON();
    console.log(form)
    return this.http.post('http://localhost:4300/api/addproduct', form, {
      headers: { 'Content-Type': 'application/json' }, responseType: 'json', observe: 'response'
    })
      .subscribe({
        next: (response) => {
          //console.log(response)
          //switch to form reset later
          this.finalPrice.setValue(this.defaultInfo.finalPrice.toString());
          this.originalPrice.setValue(this.defaultInfo.originalPrice.toString());
          this.name.setValue(this.defaultInfo.name);
          this.description.setValue(this.defaultInfo.description);
          this.category.setValue(this.defaultInfo.category);
          this.tag.setValue(this.defaultInfo.tag);
          this.imgURL.setValue(this.defaultInfo.imgURL);
          location.reload();
        },
        error: (error) => console.log(error),
      });
  }
}
