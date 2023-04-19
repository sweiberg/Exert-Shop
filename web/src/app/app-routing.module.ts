import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import {ProductHomeComponent} from './product_home';
import {AddProductComponent} from './admin/add_product';
import { AddCategoryComponent } from './admin/add_category';
import { ProfileComponent } from './profile';
import { MessageSendComponent } from './inbox/send';
import { MessageReadComponent } from './inbox/read';
import { MessageInboxComponent } from './inbox';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path : 'sample_product', component: ProductHomeComponent},
  { path : 'admin/add_product', component: AddProductComponent},
  { path : 'admin/add_category', component: AddCategoryComponent},
  { path : 'profile', component: ProfileComponent},
  { path : 'inbox/send', component: MessageSendComponent},
  { path : 'inbox/read', component: MessageReadComponent},
  { path : 'inbox', component: MessageInboxComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
