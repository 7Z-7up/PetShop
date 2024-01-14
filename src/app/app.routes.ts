import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutComponent } from './Components/about/about.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistComponent } from './Components/regist/regist.component';
import { SearchComponent } from './Components/search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'all-products', component: AllProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: '**', component: ErrorComponent },
];
