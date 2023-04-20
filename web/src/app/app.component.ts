import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from './shared/auth/auth.service'
import { Router } from '@angular/router';
import { StorageService } from './shared/auth/storage.service';
import data from './searchdata.json';
import {Product} from "./schema/product.schema";
import {ProductService} from "./shared/product/product.service";
import { Category } from './schema/category.schema';
import {MatDialog} from "@angular/material/dialog";
import {SearchComponent} from "./globals/search-box/search/search.component";
import {CheckoutFormComponent} from "./globals/checkout-form/checkout-form.component";

interface Search {
  title: string;
  cat: string;
  subcat: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit{
  title: String = 'Exert Shop';
  //isLoggedIn = false;
  myControl = new FormControl('');
  search: Search[] = data;
  options: string[] = this.search.map(search => search.title);
  category: string[] = this.search.map(search => search.cat);
  filteredOptions!: Observable<string[]>;
  cartLength: number = 0;
  @ViewChild(MatMenuTrigger, { static: false })
  trigger!: MatMenuTrigger;
  recheckIfInMenu!: boolean;
  showCart: boolean = false;
  cartItems: Product[];
  productInfo: ProductService;
  constructor(public dialog: MatDialog, private router: Router, public authService: AuthService, private storageService: StorageService, public productService: ProductService) {
    this.productInfo = {} as ProductService;
  }

  public user: any;

  ngOnInit() {
    this.authService.verify()
    .subscribe({
      next: (response) => {
        this.authService.isLoggedIn = true;
        this.user = response;
      },
      error: (error) => {
        this.authService.isLoggedIn = false;
      }
    });
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartLength = cart.length;
    this.recheckIfInMenu = false;
  }

  async getCart() {
    let cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(cartStorage);
    this.cartItems = [];
    for (let i = 0; i < cartStorage.length; i++) {
      (await this.productService.getProduct(cartStorage[i])).subscribe({
        next: (response) => {
          let data = response.body.data;
          let imgURL = data.imageURL;
          let tag = data.tags;
          if (response.status == 200) {
            let product = new Product(data.name, data.finalPrice, data.originalPrice, data.category, data.categoryID, tag, imgURL, data.description, data.categoryID);
            product.id = data.ID;
            this.cartItems.push(product);
          }
        }
      });
    }
  }

  async GetProduct() {
    //get myControl value
    let keyword = this.myControl.value;
    await (await this.productService.searchProduct(keyword)).subscribe({
        next: (response) => {
          console.log(response.body.data)
          let ProductList = [];
          if (response.status == 200) {
            for(let i = 0; i < response.body.data.length; i++){
              let data = response.body.data[i];
              let imgURL = data.imageURL;
              let tag = data.tags;
              let product = new Product(data.name, data.finalPrice, data.originalPrice, data.category, tag, imgURL, data.description,);
              product.id = data.ID;
              ProductList.push(product);
            }
            let dialogRef = this.dialog.open(SearchComponent, {
              disableClose: false,
              width:'80%',
              height: '90%',
            });
            dialogRef.componentInstance.data = ProductList;
          }
          }
      }
    );
  }

   async openCart(){
    this.getCart().then(() => {
      console.log("Finished")
      console.log(this.cartItems)
      this.showCart = !this.showCart;
    });
  }

  removeItem(id:any){
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let index = cart.indexOf(id);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartLength = cart.length;
    this.getCart();
  }

  Checkout(){
    //check if cart is empty
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if(cart.length == 0){
      alert("Cart is empty, cannot checkout");
      return;
    }
    let dialogRef = this.dialog.open(CheckoutFormComponent, {
      disableClose: false,
      width:'50%',
      height: '90%',
    });
    //inject cart items
    dialogRef.componentInstance.data = this.cartItems;
  }

  openResourceMenu() {
    this.trigger.openMenu();
  }

  closeResourceMenu() {
    setTimeout(() => {
      if (this.recheckIfInMenu === false) {
        this.trigger.closeMenu();
      }
    }, 175);
  }

  openVG() {
    this.router.navigate(['/category'], {queryParams: {id: 11}});
  }

  openInbox() {
    this.router.navigate(['/inbox'], {queryParams: {user: this.user.data}});
  }

  Profile() {
    this.router.navigate(['/profile'], {queryParams: {user: this.user.data}});
  }

  Logout() {
    this.storageService.clean();
    this.authService.isLoggedIn = false;
    location.reload();
  }

  Login() {
    this.router.navigate(['/login']);
  }

  Register() {
    this.router.navigate(['/register']);
  }
  updateCartLength(){
    let cart = JSON.parse(localStorage.getItem('productIDList') || '[]');
    this.cartLength = cart.length;
    console.log("Cart Length Updated");
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

 }
