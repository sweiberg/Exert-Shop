import {Component, Input, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProductService} from "@shared/product/product.service";
import {Product} from "../../schema/product.schema";

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
//create a new form group
  form: FormGroup;
  productInfo: ProductService;
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data:any,@Inject(MAT_DIALOG_DATA) dialog:any,public productService: ProductService) {
    this.productInfo = {} as ProductService;
  }
  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      creditCard: [''],
      expiration: [''],
      cvv: ['']
    });
  }
  async InitiateCheckout() {
    console.log("Call the checkout API here with the product service");
    //create the json array
    let checkoutItems = [];
    let cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    for (let i = 0; i < cartStorage.length; i++) {
      let productID = cartStorage[i].id;
      let quantity = 1;
      let productObject = {
        "id": productID,
        "quantity": quantity
      }
      checkoutItems.push(productObject);
    }
    //call the checkout API and pass the json array
    (await this.productService.checkoutProducts(checkoutItems)).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.removeItem('cart');
        if(response.status === 200) {
          alert("Checkout successful");
        }
        // window.location.reload();
      }
    });
    }
}
