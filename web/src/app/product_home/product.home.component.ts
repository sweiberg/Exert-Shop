import {Component} from '@angular/core';
import {Product} from "../schema/product.schema";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'product.home.component.html',
})
export class ProductHomeComponent{
  productList:Product[] = [];
  constructor(private http: HttpClient){
    // This is a temporary solution to get the products
    let productAmount = 8;// This will be replaced by a call to the backend to get the products
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
