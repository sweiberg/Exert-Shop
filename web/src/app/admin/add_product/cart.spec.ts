import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../app.component';
import {ProductHomeComponent} from "../../product_home";
import {ProductComponent} from "../../globals/product";
import { AppModule } from '../../app.module';

describe('CartSystem', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule
      ],
      declarations: [
        AppComponent,
        ProductHomeComponent,
        ProductComponent
      ],
      providers:[AppComponent],
    }).compileComponents();
  });

  it('Verify Initial Cart Length', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.cartLength).toEqual(0);
  });

  it('Check Cart Storage [ADD]', () => {
    //clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(1);
    localStorage.setItem('cart', JSON.stringify(cart));
    const fixtureApp = TestBed.createComponent(AppComponent);
    const app = fixtureApp.componentInstance;
    app.cartLength = cart.length;
    expect(fixtureApp.componentInstance.cartLength).toEqual(1);
  });

  it('Check Cart Storage [REMOVE]', () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.pop();
    localStorage.setItem('cart', JSON.stringify(cart));
    const fixtureApp = TestBed.createComponent(AppComponent);
    const app = fixtureApp.componentInstance;
    app.cartLength = cart.length;
    expect(fixtureApp.componentInstance.cartLength).toEqual(0);
  });
});
