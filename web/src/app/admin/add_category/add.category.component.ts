import { Component } from '@angular/core';
import { ProductService } from '../../shared/product/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add.category',
  templateUrl: './add.category.component.html',
  styleUrls: ['./add.category.component.css']
})
export class AddCategoryComponent {
  form: FormGroup;
  constructor(private productService: ProductService, public fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const name = this.form.controls['name'].value;
    const description = this.form.controls['description'].value;

    this.productService.addCategory(name, description).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
  });;
  }
}
