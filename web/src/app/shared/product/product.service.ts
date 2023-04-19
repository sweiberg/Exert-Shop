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

  addCategory(name: string, description: string): Observable<any> {
    return this.http.post(
      'http://localhost:4300/api/addcategory',
      {
        name,
        description
      }
    );
  }

  getCategories(): Observable<any> {
    return this.http.get(
      'http://localhost:4300/api/category/all',
      {
      }
    );
  }

  getCategoryByID(id: number) :Observable<any> {
    return this.http.get(
      'http://localhost:4300/api/category/' + id,
      {
      }
    );
  }

  getSample(): Observable<any> {
    return this.http.get(
      'http://localhost:4300/api/category/all/5',
      {
      }
    );
  }
}
