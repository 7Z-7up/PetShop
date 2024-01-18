import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslationService } from '../../Services/translation.service';
import { User } from '../../Helpers/users';
import { ProductService } from '../../Services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { CartHoverComponent } from '../cart-hover/cart-hover.component';
import { AuthService } from '../../Services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { Auth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    CartHoverComponent,
    AngularFireAuthModule,
    AngularFireModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService, AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  User: User = { id: 0, cart: [] };
  cartProducts: Product[] = [];
  quantities: number[] = [];
  @ViewChild('closeSearch') closeSearch: any;
  @ViewChild('mobileSearch') mobileSearch: any;

  constructor(
    private translationService: TranslationService,
    private myService: ProductService,
    private router: Router,
    public userServ: AuthService
  ) {}

  private auth: Auth = inject(Auth);

  ngOnInit(): void {
    this.myService.getUser(1).subscribe({
      next: (data: any) => {
        for (const key in data) {
          this.User = data[key];
        }
        this.User.cart.forEach((element) => {
          this.myService.getSupplements(element.id).subscribe({
            next: (productData) => {
              let product: any = productData;
              for (const key in product) {
                this.cartProducts.push(product[key]);
              }
              if (!this.cartProducts) this.cartProducts = [];
            },
            error: () => console.log('Error!'),
          });
          this.quantities[element.id] = element.quantity;
        });
      },
      error: () => console.log('Error getting user info!'),
      complete: () => {},
    });
  }

  isSearchBarOpen = false;

  originalText = {
    searchpar: 'Type here to search',
    AddaProduct: 'Add a Product',
    About: 'About',
    Shopping: 'Shopping Cart',
    ContactUs: 'Contact Us!',
    Home: 'Home',
    search: 'search',
    hellothere: 'hello there!',
    ahmedalaa: 'ahmed alaa',
    title: 'Hello, World!',
    paragraph1: 'This is the firstttt paragraph to be translated.',
    paragraph2: "And here's the second paragraph waiting for translation.",
    allproducts: 'Products',
    dashboard: 'Dashboard',
    a1: 'Sign In',
    a2: 'Sign Out',
  };

  translatedText = {
    searchpar: 'أضغط هنا للبحث',
    AddaProduct: 'أضف منتج',
    About: 'حول',
    Shopping: 'سلة التسوق',
    ContactUs: 'تواصل معنا ! ',
    Home: 'الصفحة الرئيسية',
    search: 'بحث',
    hellothere: '!أهلا هناك',
    ahmedalaa: 'أحمد علاء',
    title: 'مرحبا، عالم!',
    paragraph1: 'هذه هي الفقرة الأولى التي سيتم ترجمتها.',
    paragraph2: 'وهذه الفقرة الثانية في انتظار الترجمة.',
    allproducts: 'المنتجات',
    dashboard: 'لوحة التحكم',
    a1: 'تسجيل الدخول',
    a2: 'تسجيل الخروج',
  };

  isTranslated = false;

  toggleTranslation() {
    this.isTranslated = !this.isTranslated;
    this.translationService.toggleTranslation();
    const navbar = document.getElementById('navbar');
    const nav = document.getElementById('nav');
    const smallNav = document.getElementById('smallNav');
    const search = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    // if (navbar) navbar.style.direction = this.isTranslated ? 'rtl' : 'ltr';
    // if (nav) nav.style.direction = this.isTranslated ? 'rtl' : 'ltr';
    // if (smallNav) smallNav.style.direction = this.isTranslated ? 'rtl' : 'ltr';
    if (search)
      search.style.borderRadius = this.isTranslated
        ? '4px 0 0 4px'
        : '0 4px 4px 0';
    if (searchInput)
      searchInput.style.borderRadius = this.isTranslated
        ? '0 4px 4px 0'
        : '4px 0 0 4px';

    const bubble = document.getElementById('bubble');

    if (this.isTranslated) {
      bubble?.classList.add('bubbleAR');
      bubble?.classList.remove('bubble');
    } else {
      bubble?.classList.add('bubble');
      bubble?.classList.remove('bubbleAR');
    }
  }

  cartShow() {
    const bubble = document.getElementById('bubble');
    bubble!.style.display = 'block';
  }
  cartHide() {
    const bubble = document.getElementById('bubble');
    bubble!.style.display = 'none';
  }

  search(query: string) {
    this.router.navigateByUrl(`/search/${query}`);
    this.closeSearch.nativeElement.click();
    this.mobileSearch.nativeElement.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarCollapse = document.getElementById('navbarSupportedContent');

  if (navbarToggle && navbarCollapse) {
    navbarToggle.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }
});
