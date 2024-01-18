import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { User } from '../../Helpers/users';
import { Router, RouterLink } from '@angular/router';
import { CartServiceService } from '../../Services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-cart-hover',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  providers: [ProductService],
  templateUrl: './cart-hover.component.html',
  styleUrl: './cart-hover.component.css',
})
export class CartHoverComponent implements OnInit {
  User: any;
  quantity: any;
  products: any[] = [];
  subTotal = 0;
  originalText = {
    a1: 'Subtotal',
    a2: 'View Cart',
    a3: 'EGP',
  };

  translatedText = {
    a1: 'المجموع الكلي',
    a2: 'عرض السلة',
    a3: 'ج.م',
  };

  isTranslated = false;
  constructor(
    private myService: ProductService,
    private cartService: CartServiceService,
    private translationService: TranslationService
  ) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
  }
  ngOnInit(): void {
    this.myService.getUser(1).subscribe({
      next: (data: any) => {
        for (const key in data) {
          this.User = data[key];
        }
      },
    });

    this.cartService.cartItems$.subscribe((data) => {
      this.products = [];
      for (let i = 0; i < data.length; i++) {
        this.myService.getSupplements(data[i].id).subscribe({
          next: (productData: any) => {
            for (const key in productData) {
              productData[key].quan = data[i].quantity;
              this.products.push(productData[key]);
            }
            // console.log(this.products);
          },
          complete: () => this.refreshTotal(),
        });
      }
    });
    this.cartService.getCart();
  }

  deleteProduct(id: number = 66) {
    if (confirm('Do you want to delete this product from cart?')) {
      this.User.cart = this.User.cart.filter((item: any) => item.id !== id);
      this.myService.updateUser(this.User).subscribe({
        // next: () => console.log(this.User),
        error: () => console.log('Error Updating'),
        complete: () => {
          this.products = this.products.filter((element) => element.id != id);

          this.refreshTotal();
        },
      });
    }
  }

  refreshTotal() {
    this.subTotal = 0;
    this.products.forEach((element) => {
      this.subTotal += element.quan * element.price;
    });
  }
}
