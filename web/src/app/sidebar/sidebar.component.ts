import {Component, Inject, Input} from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  //take component input data any
  @Input() productData: any;
  sum: number = 0;
  constructor() {}
  ngOnInit() {
    this.productData.forEach((element: any) => {
      let price = 0;
      if(element.finalPrice!==0|| element.finalPrice!=""){
        price = element.finalPrice;
      }else{
        price = element.originalPrice;
      }
      this.sum += price;
    });
  }
}
