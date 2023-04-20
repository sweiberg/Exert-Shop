import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutFormComponent } from './checkout-form.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AppModule} from "../../app.module";
import {AppComponent} from "../../app.component";
import {ProductHomeComponent} from "../../product_home";
import {ProductComponent} from "../product";

describe('CheckoutFormComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  //use the app component to test the checkout form component

  it('should load the checkout form' , () => {
    expect(component.dialog).toBeTruthy();
  });

  it('should open' , () => {
    expect(component.dialog.open).toBeTruthy();
  });

  it('should close' , () => {
    expect(component.dialog.closeAll).toBeTruthy();
  });



});
