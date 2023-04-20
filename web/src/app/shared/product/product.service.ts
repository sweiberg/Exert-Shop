import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',

})
export class ProductService {
  constructor(private http: HttpClient) {}
  public async getProduct(id:String): Promise<Observable<any>> {
    const url = 'http://localhost:4300/api/product/'+id;
    return this.http.get<any>(url,  {headers: { 'Content-Type': 'application/json'}, responseType: 'json', observe: 'response'
  });
  }
  public async searchProduct(keyword:String|null): Promise<Observable<any>> {
    const url = 'http://localhost:4300/api/product/search/'+keyword;
    return this.http.get<any>(url,  {headers: { 'Content-Type': 'application/json'}, responseType: 'json', observe: 'response'
  });
  }
  //checkout call post
  public async checkoutProducts(products:{}[]): Promise<Observable<any>> {
    const url = 'http://localhost:4300/api/checkout/';
    //send id and quantity as json
    return this.http.post<any>(url, products, {headers: { 'Content-Type': 'application/json'}, responseType: 'json', observe: 'response'
  });
  }
}
