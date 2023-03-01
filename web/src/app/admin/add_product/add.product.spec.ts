import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from '../../register';
import { AppModule } from '../../app.module';
import {AddProductComponent} from "./add.product.component";

describe('AddProduct', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule
      ],
      declarations: [
        AddProductComponent,
        RegisterComponent
      ],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddProductComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should have valid form fields', () => {
    const fixture = TestBed.createComponent(AddProductComponent);
    const app = fixture.componentInstance;
    expect(app.name).toBeTruthy();
    expect(app.originalPrice).toBeTruthy();
    expect(app.finalPrice).toBeTruthy();
    expect(app.description).toBeTruthy();
    expect(app.category).toBeTruthy();
    expect(app.tag).toBeTruthy();
    expect(app.imgURL).toBeTruthy();
  });


  it('should have a product element', () => {
    const fixture = TestBed.createComponent(AddProductComponent);
    const app = fixture.componentInstance;
    expect(app.product).toBeTruthy();
  });


  it('should change product element as form is updated', () => {
    const fixture = TestBed.createComponent(AddProductComponent);
    const app = fixture.componentInstance;
    app.name.setValue('test');
    app.imgURL.setValue('test');
    app.category.setValue('test');
    app.description.setValue('test');
    app.finalPrice.setValue('100');
    app.originalPrice.setValue('100');
    app.tag.setValue('test');
    expect(app.product.name).toEqual('test');
    expect(app.product.imgURL).toEqual('test');
    expect(app.product.category).toEqual('test');
    expect(app.product.description).toEqual('test');
    expect(app.product.finalPrice).toEqual(100);
    expect(app.product.originalPrice).toEqual(100);
    expect(app.product.tag).toEqual('test');
  });
});
