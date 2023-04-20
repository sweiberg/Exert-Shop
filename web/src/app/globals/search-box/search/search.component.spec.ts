import { ComponentFixture, TestBed } from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {AppModule} from "../../../app.module";
import {AppComponent} from "../../../app.component";
import {ProductHomeComponent} from "../../../product_home";
import {ProductComponent} from "../../product";

describe('SearchFormComponent', () => {
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

  it('search component should load' , () => {
    expect(component.search).toBeTruthy();
  });

});
