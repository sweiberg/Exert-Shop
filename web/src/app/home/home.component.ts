import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product/product.service';
import { Category } from '../schema/category.schema';
import { Product } from '../schema/product.schema';

@Component({ templateUrl: 'home.component.html', styleUrls: ['home.component.css'] })
export class HomeComponent implements OnInit {
    catList: Array<Category>;
    prodList: Array<Product>;
    isInbox: boolean = true;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.catList = new Array();

        this.productService.getSample().subscribe({
            next: (response) => {
                console.log(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    this.prodList = new Array();
                    for (let j = 0; j < response.data[i].Products.length; j++) {
                        const prodName = response.data[i].Products[j].name;
                        const finalPrice = response.data[i].Products[j].finalPrice;
                        const originalPrice = response.data[i].Products[j].originalPrice;
                        const category = response.data[i].name;
                        const categoryID = response.data[i].Products[j].categoryID;
                        const tags = response.data[i].Products[j].tags;
                        const imgURL = response.data[i].Products[j].imgURL;
                        const prodDesc = response.data[i].Products[j].description;
                        const prodItem = new Product(prodName, finalPrice, originalPrice, category, tags, imgURL, prodDesc, categoryID);
                        this.prodList.push(prodItem);
                    }
                    const catID = response.data[i].ID;
                    const catName = response.data[i].name;
                    const catDesc = response.data[i].description;
                    const catItem = new Category(catID, catName, catDesc, this.prodList);
                    this.catList.push(catItem);
                    console.log(this.catList);
                }
            },
            error: (error) => {
                console.log(error);
            }
          });
    }
    
}