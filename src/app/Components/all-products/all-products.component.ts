import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Helpers/products';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../Helpers/users';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartServiceService } from '../../Services/cart.service';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    FormsModule,
    NgxPaginationModule,
    // ReactiveFormsModule,
  ],
  providers: [ProductService],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  Products: Product[] = [];
  currentPage: number = 1;
  filterdproduct: Product[] = [];
  defaultfilterdproduct: Product[] = [];
  selectedSort = 'default';
  User: User = { id: 0, cart: [] };
  dummy = [1, 2, 3, 4];
  page: number = 1;
  total: number = this.filterdproduct.length;
  itemsInPage: number = 12;

  originalText = {
    Products: 'Products',
    SortBy: 'Sort By:',
    default: 'default',
    LowestPrice: 'Lowest Price',
    HighestPrice: 'Highest Price ',
    LowestRating: 'Lowest Rating ',
    HighestRating: 'Highest Rating',
    LowestReviews: 'Lowest Reviews',
    HighestReviews: 'Highest Reviews',
    Show: 'Show:',
    EGP: 'EGP',
    AddtoCart: 'Add to Cart',
  };

  translatedText = {
    Products: 'منتجات',
    SortBy: 'ترتيب ب',
    default: 'إفتراضي',
    LowestPrice: 'أقل سعر',
    HighestPrice: 'أعلي سعر',
    LowestRating: 'أقل تقييم',
    HighestRating: 'أعلي تقييم',
    LowestReviews: 'أقل المراجعات',
    HighestReviews: 'أعلي المراجعات',
    Show: 'عرض',
    EGP: 'ج.م',
    AddtoCart: 'أضف إلي العربة',
  };

  isTranslated = false;
  constructor(
    private myProducts: ProductService,
    private cartService: CartServiceService,
    private translationService: TranslationService
  ) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
  }

  ngOnInit(): void {
    this.myProducts.getUser(1).subscribe({
      next: (userData) => {
        let user: any = userData;
        for (const key in user) this.User = user[key];
      },
      error: () => console.log('Error!'),
    });

    this.myProducts.getAllSupplements().subscribe({
      next: (data) => {
        this.Products = this.Products.concat(data);
      },
      error: () => console.log('Error getting the data!'),
      complete: () => this.allproducts(),
    });
  }

  addToCart(id?: any, category?: any) {
    if (!this.User.cart) this.User.cart = [];
    if (this.User.cart.some((item: any) => item.id == id)) {
      let index = this.User.cart.findIndex((item: any) => item.id == id);
      this.User.cart[index].quantity++;
    } else {
      this.User.cart.push({ category: category, id: id, quantity: 1 });
    }

    this.myProducts.updateUser(this.User).subscribe({
      next: () => {
        this.cartService.getCart();
      },
      error: () => console.log('Could not Add!'),
      complete: () => this.openModal(),
    });
  }

  filter(name: string = '', id: number = 0) {
    this.backgroundUpdate(id);
    if (name === '' && id === 0) this.filterdproduct = this.Products;
    else
      this.filterdproduct = this.Products.filter(
        (product) => product.categories === name
      );
    this.defaultfilterdproduct = [...this.filterdproduct];
    this.changeValue(12);
  }

  allproducts() {
    this.filter();
  }
  getbirds() {
    this.filter('bird', 1);
  }
  getcats() {
    this.filter('cat', 2);
  }
  getdogs() {
    this.filter('dog', 3);
  }
  getfish() {
    this.filter('fish', 4);
  }

  gethamester() {
    this.filter('rodents', 5);
  }

  openModal() {
    const myModal = document.getElementById('statusSuccessModal');
    if (myModal) myModal.style.display = 'block';
  }

  closeModal() {
    const myModal = document.getElementById('statusSuccessModal');
    if (myModal) myModal.style.display = 'none';
  }

  displayStars(rating: any) {
    const starsArray: string[] = [];

    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--) starsArray.push('fa fa-star');

    // If there is a half a star, append it
    if (i == 0.5) starsArray.push('fas fa-star-half-alt');

    // Fill the empty stars
    for (let i = 5 - rating; i >= 1; i--) starsArray.push('far fa-star');

    return starsArray;
  }

  backgroundUpdate(id: number) {
    this.selectedSort = 'default';
    this.filterdproduct = [...this.defaultfilterdproduct];
    document.querySelectorAll('.category').forEach((item) => {
      item.classList.remove('selected');
    });
    document.querySelectorAll('.category')[id].classList.add('selected');
  }

  sorting(i: string) {
    switch (i) {
      case 'pricelow':
        this.filterdproduct.sort(
          (product1: any, product2: any) => product1.price - product2.price
        );
        break;
      case 'pricehigh':
        this.filterdproduct.sort(
          (product1: any, product2: any) => product2.price - product1.price
        );
        break;
      case 'ratinglow':
        this.filterdproduct.sort(
          (product1: any, product2: any) => product1.rating - product2.rating
        );
        break;
      case 'ratinghigh':
        this.filterdproduct.sort(
          (product1: any, product2: any) => product2.rating - product1.rating
        );
        break;
      case 'reviewslow':
        this.filterdproduct.sort(
          (product1: any, product2: any) => product1.reviews - product2.reviews
        );
        break;
      case 'reviewshigh':
        this.filterdproduct.sort(
          (product1: any, product2: any) => product2.reviews - product1.reviews
        );
        break;
      case 'default':
      default:
        this.filterdproduct = [...this.defaultfilterdproduct];
    }
  }

  changeValue(val: number) {
    this.itemsInPage = val;
    this.page = 1;
    this.total = this.filterdproduct.length;
  }
  changePage(event: any) {
    this.page = event;
    this.total = this.filterdproduct.length;
  }
}
