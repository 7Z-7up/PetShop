import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
} from '@angular/core';
import { ProductService } from '../../Services/product.service';
import {
  ActivatedRoute,
  ActivationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { CartServiceService } from '../../Services/cart.service';
import { User } from '../../Helpers/users';
import { SwiperContainer, register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { Product } from '../../Helpers/products';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  providers: [ProductService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements AfterViewInit {
  ID: number = 0;
  product: Product = {};
  selectedQuantity: number | undefined;
  quantityOptions: number[] = [];
  User: User = { id: 0, cart: [] };
  dummy = [1, 2, 3, 4];
  allProducts: Product[] = [];
  filterdproduct: Product[] = [];

  constructor(
    private myProduct: ProductService,
    router: Router,
    private cartService: CartServiceService
  ) {
    router.events.subscribe((data) => {
      if (data instanceof ActivationEnd) {
        this.ID = data.snapshot.params['id'];
        this.ngOnInit();
      }
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
    this.myProduct.getUser(1).subscribe({
      next: (userData) => {
        let user: any = userData;
        for (const key in user) this.User = user[key];
      },
      error: () => console.log('Error!'),
    });

    this.myProduct.getSupplements(this.ID).subscribe({
      next: (data: any) => {
        for (const key in data) {
          this.product = data[key];
          // for (const key in this.product) {
          //   if (key === 'quantity') {
          //     this.quantityOptions = this.generateQuantityOptions(
          //       this.product[key]
          //     );
          //   }
          // }
        }
      },
      error: () => console.log('Error getting product data!'),
    });

    this.myProduct.getAllSupplements().subscribe({
      next: (data: any) => {
        this.allProducts = [...data];
      },
      error: () => console.log('Error!'),
      complete: () => {
        this.filterdproduct = this.allProducts
          .filter(
            (element) =>
              element.categories == this.product.categories &&
              element.id != this.product.id
          )
          .slice(0, 8);
      },
    });
  }

  openModal() {
    const myModal = document.getElementById('statusSuccessModal');
    if (myModal) myModal.style.display = 'block';
  }

  closeModal() {
    const myModal = document.getElementById('statusSuccessModal');
    if (myModal) myModal.style.display = 'none';
  }

  generateQuantityOptions(maxQuantity: number): number[] {
    // Generate an array of numbers from 1 to maxQuantity
    return Array.from({ length: maxQuantity }, (_, index) => index + 1);
  }

  selectQuantity(quantity: number): void {
    this.selectedQuantity = quantity;
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

  buyNow() {}
  changeImage() {}

  addToCart(id?: any, category?: any) {
    if (!this.User.cart) this.User.cart = [];
    if (this.User.cart.some((item: any) => item.id == id)) {
      let index = this.User.cart.findIndex((item: any) => item.id == id);
      this.User.cart[index].quantity++;
    } else {
      this.User.cart.push({ category: category, id: id, quantity: 1 });
    }

    this.myProduct.updateUser(this.User).subscribe({
      next: () => {
        this.cartService.getCart();
      },
      error: () => console.log('Could not Add!'),
      complete: () => this.openModal(),
    });
  }
}
