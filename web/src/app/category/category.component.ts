import { Component } from '@angular/core';
import { ProductService } from '../shared/product/product.service';
import { Category } from '../schema/category.schema';
import { Product } from '../schema/product.schema';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category: Category = {};
  prodList: Array<Product>;
  isInbox: boolean = true;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
      this.prodList = new Array();
      const filter = Number(this.route.snapshot.queryParamMap.get('id'));
      this.productService.getCategoryByID(filter).subscribe({
          next: (response) => {
              for (let products of response.data.Products) {
                const prodName = products.name;
                const finalPrice = products.finalPrice;
                const originalPrice = products.originalPrice;
                const category = response.data.name;
                const categoryID = products.categoryID;
                const tags = products.tags;
                const imageURL = products.imageURL;
                const prodDesc = products.description;
                const prodItem = new Product(prodName, finalPrice, originalPrice, category, tags, imageURL, prodDesc, categoryID);
                this.prodList.push(prodItem);
              }
              const catID = response.data.ID;
              const catName = response.data.name;
              const catDesc = response.data.description;
              this.category = new Category(catID, catName, catDesc, this.prodList);
          },
          error: (error) => {
              console.log(error);
          }
        });
  }
  
}
