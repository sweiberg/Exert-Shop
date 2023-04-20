import {Component, Input, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
//create a new form group
  form: FormGroup;
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data:any) {}
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
  InitiateCheckout(){
    console.log("Call the checkout API here");
  }
}
