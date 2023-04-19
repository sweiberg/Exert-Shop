import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
//create a new form group
  form: FormGroup;
  constructor(public fb: FormBuilder) {
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
}
