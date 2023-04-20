import {Component} from '@angular/core';
import {Product} from "../schema/product.schema";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'product.home.component.html',
  selector: 'product-home'
})
export class ProductHomeComponent{
  productList:Product[] = [];
  constructor(private http: HttpClient){
    // How many products do you want to show?
    let productAmount = 10;
    for(let i = 1; i < productAmount+1; i++){
      this.http.get('http://localhost:4300/api/product/'+i,{
        headers: { 'Content-Type': 'application/json'}, responseType: 'json', observe: 'response'
      })
        .subscribe({
          next: (response) => {
            //get the data from the response
            // @ts-ignore
            let data = response.body.data;
            let imgURL = data.imageURL;
            let tag = data.tags;
            if(response.status == 200){
              let product = new Product(data.name, data.finalPrice, data.originalPrice, data.category, data.categoryID, tag, imgURL, data.description,);
              product.id = data.ID;
              this.productList.push(product);
            }
          },
          error: (error) => console.log(error),
        });
    }
  }
}
