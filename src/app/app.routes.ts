import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ErrorComponent } from './Components/error/error.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutComponent } from './Components/about/about.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent },
];
