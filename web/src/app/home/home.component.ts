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
                for (let categories of response.data) {
                    this.prodList = new Array();
                    if (categories.Products) {
                        for (let products of categories.Products) {
                            const prodName = products.name;
                            const finalPrice = products.finalPrice;
                            const originalPrice = products.originalPrice;
                            const category = categories.name;
                            const categoryID = products.categoryID;
                            const tags = products.tags;
                            const imageURL = products.imageURL;
                            const prodDesc = products.description;
                            const prodItem = new Product(prodName, finalPrice, originalPrice, category, tags, imageURL, prodDesc, categoryID);
                            this.prodList.push(prodItem);
                        }
                    const catID = categories.ID;
                    const catName = categories.name;
                    const catDesc = categories.description;
                    const catItem = new Category(catID, catName, catDesc, this.prodList);
                    this.catList.push(catItem);
                    }
                }
            },
            error: (error) => {
                console.log(error);
            }
          });
    }
    
}