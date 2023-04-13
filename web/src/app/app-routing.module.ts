import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import {ProductHomeComponent} from './product_home';
import {AddProductComponent} from './admin/add_product';
import { ProfileComponent } from './profile';
import { MessageSendComponent } from './message/send';
import { MessageReadComponent } from './message/read';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path : 'sample_product', component: ProductHomeComponent},
  { path : 'admin/add_product', component: AddProductComponent},
  { path : 'profile', component: ProfileComponent},
  { path : 'message/send', component: MessageSendComponent},
  { path : 'message/read', component: MessageReadComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
