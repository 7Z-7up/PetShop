import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';
import { User } from '../../Helpers/users';
import { CartServiceService } from '../../Services/cart.service';
import { SwiperContainer, register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [ProductService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.css',
})
export class ProductsCategoryComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  User: User = { id: 0, cart: [] };
  dummy = [1, 2, 3, 4];
  isTranslated = false;

  originalText = {
    latest: 'Latest',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to cart!',
    addedToCartmsg: 'The product got successfully added to your cart.',
    ok: 'Ok',
  };

  translatedText = {
    latest: 'الأحدث',
    addToCart: 'أضف إلى السلة',
    addedToCart: 'تم الإضافة إلى السلة!',
    addedToCartmsg: 'المنتج قد تم إضافته بنجاح إلى السلةالخاصة بك.',
    ok: 'حسنا',
  };

  @ViewChild('ProductSwiper') ProductSwiper?: ElementRef;

  constructor(
    private myProducts: ProductService,
    private cartService: CartServiceService,
    private translationService: TranslationService
  ) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
  }

  ngAfterViewInit(): void {
    register();

    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      const swiperConfig = {
        slidesPerView: 4,
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        },
      };
      Object.assign(swiperEl, swiperConfig);
    }
  }

  ngOnInit(): void {
    this.myProducts.getAllSupplements().subscribe({
      next: (data) => (this.products = this.products.concat(data)),
      error: (err) => console.log(err),
      complete: () => this.getbirds(),
    });
    this.myProducts.getUser(1).subscribe({
      next: (userData) => {
        let user: any = userData;
        for (const key in user) this.User = user[key];
      },
      error: () => console.log('Error!'),
    });
  }

  filterdproduct: Product[] = [];
  getfish() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'fish')
      .slice(0, 8);
    // this.filterdproduct.slice
  }
  getcats() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'cat')
      .slice(0, 8);
  }
  getdogs() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'dog')
      .slice(0, 8);
  }
  getbirds() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'bird')
      .slice(0, 8);
  }
  gethamester() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'rodents')
      .slice(0, 8);
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
        this.openModal();
      },
      error: () => console.log('Could not Add!'),
    });
  }
}
