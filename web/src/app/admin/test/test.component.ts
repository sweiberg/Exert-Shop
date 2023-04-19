import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../schema/purchase.schema';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  purchases: Purchase[];
  constructor() {}

  ngOnInit() {
    this.purchases = new Array();
    const item1 = new Purchase(1,1);
    const item2 = new Purchase(2,1);
    const item3 = new Purchase(3,1);
    this.purchases.push(item1);
    this.purchases.push(item2);
    this.purchases.push(item3);

    console.log(JSON.stringify(this.purchases));
  }

}