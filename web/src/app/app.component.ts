import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from './shared/auth/auth.service'
import { Router } from '@angular/router';
import { StorageService } from './shared/auth/storage.service';
import data from 'src/app/searchdata.json';
import {Product} from "./schema/product.schema";
import {ProductService} from "./shared/product/product.service";

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
  isLoggedIn = false;
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
  constructor(private router: Router, private authService: AuthService, private storageService: StorageService, public productService: ProductService) {
    this.productInfo = {} as ProductService;
  }

  public user: any;

  ngOnInit() {
    this.authService.verify()
    .subscribe({
      next: (response) => {
        this.isLoggedIn = true;
        this.user = response;
      },
      error: (error) => {
        this.isLoggedIn = false;
      }
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
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
            let product = new Product(data.name, data.finalPrice, data.originalPrice, data.category, tag, imgURL, data.description,);
            product.id = data.ID;
            this.cartItems.push(product);
          }
        }
      });
    }
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
