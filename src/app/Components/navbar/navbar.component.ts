import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslationService } from '../../Services/translation.service';
import { User } from '../../Helpers/users';
import { ProductService } from '../../Services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { CartHoverComponent } from '../cart-hover/cart-hover.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    CartHoverComponent,
  ],
  providers: [ProductService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  User: User = { id: 0, cart: [] };
  cartProducts: Product[] = [];
  quantities: number[] = [];
  constructor(
    private translationService: TranslationService,
    private myService: ProductService
  ) {}

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
    if (navbar) navbar.style.direction = this.isTranslated ? 'rtl' : 'ltr';
    if (nav) nav.style.direction = this.isTranslated ? 'rtl' : 'ltr';
    if (smallNav) smallNav.style.direction = this.isTranslated ? 'rtl' : 'ltr';
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

  //////////////////////////////////////////////////////////////////////////
  openAlert() {
    // Check if the search bar is not already open
    if (!this.isSearchBarOpen) {
      // Set the flag to indicate that the search bar is now open
      this.isSearchBarOpen = true;

      // Create a modal overlay
      const overlay = document.createElement('div');
      overlay.className = 'overlay';

      // Create modal content (search bar)
      const searchBar = document.createElement('div');
      searchBar.className = 'search-bar-modal';
      searchBar.style.background = '#fff';
      searchBar.style.padding = '20px';
      searchBar.style.borderRadius = '8px';
      searchBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      searchBar.style.position = 'fixed';
      searchBar.style.top = '0';
      searchBar.style.left = '50%';
      searchBar.style.transform = 'translateX(-50%)';

      const input = document.createElement('input');
      input.type = 'text';
      ////////////////////////////////////////////////////////////////////////
      input.placeholder = this.isTranslated
        ? this.translatedText.searchpar
        : this.originalText.searchpar;
      ////////////////////////////////////////////////////////////////////////
      input.style.width = '100%'; // Make the input full-width
      input.style.padding = '8px';
      input.style.marginBottom = '8px';
      input.style.border = '1px solid #ccc';
      input.style.borderRadius = '4px';

      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.gap = '8px'; // Adjust the gap as needed

      const searchButton = document.createElement('button');
      searchButton.innerText = 'Search';
      searchButton.style.flex = '1'; // Make the button take up available space
      searchButton.style.padding = '8px';
      searchButton.style.background = '#007bff';
      searchButton.style.color = '#fff';
      searchButton.style.border = 'none';
      searchButton.style.borderRadius = '4px';
      searchButton.style.cursor = 'pointer';

      const cancelButton = document.createElement('button');
      cancelButton.innerText = 'Cancel';
      cancelButton.style.flex = '1'; // Make the button take up available space
      cancelButton.style.padding = '8px';
      cancelButton.style.background = '#007bff';
      cancelButton.style.color = '#fff';
      cancelButton.style.border = 'none';
      cancelButton.style.borderRadius = '4px';
      cancelButton.style.cursor = 'pointer';
      cancelButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        this.isSearchBarOpen = false;
      });

      buttonContainer.appendChild(searchButton);
      buttonContainer.appendChild(cancelButton);

      searchBar.appendChild(input);
      searchBar.appendChild(buttonContainer);

      overlay.appendChild(searchBar);
      document.body.appendChild(overlay);

      // Add an event listener to close the overlay when clicking outside the content
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          document.body.removeChild(overlay);
          this.isSearchBarOpen = false;
        }
      });
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
