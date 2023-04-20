import {Component, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Product} from "../../../schema/product.schema";
@Component({
  templateUrl: './search.component.html',
})
export class SearchComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product[]) {}
  ngOnInit() {

  }
}
