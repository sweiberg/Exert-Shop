import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',

})
export class ProductService {
  constructor(private http: HttpClient) {}
  public async getProduct(id:String): Promise<Observable<any>> {
    let JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYXQiOjE2ODAwNzE4MjcsImlhdCI6MTY4MDA2OTgyNywiaWQiOjN9.6okYeQU2Mr7NBqMmreWTXvWwDHvMndU5w0W-u-NGq8M';
    const url = 'http://localhost:4300/api/product/'+id;
    return this.http.get<any>(url,  {headers: { 'Content-Type': 'application/json', 'Authorization': JWT }, responseType: 'json', observe: 'response'
  });
  }
}
