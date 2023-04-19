import {Component, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Product} from "../../../schema/product.schema";
import {AppComponent} from "../../../app.component";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product[]) {}
  ngOnInit() {

  }
}
