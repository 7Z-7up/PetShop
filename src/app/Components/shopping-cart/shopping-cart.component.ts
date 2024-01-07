import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartElementComponent } from '../cart-element/cart-element.component';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../Helpers/users';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CartElementComponent,
    HttpClientModule,
    RouterLink,
  ],
  providers: [ProductService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  subTotalArr: { id: number; subTotal: string }[] = [];
  subTotal = 0;
  User!: any;
  product?: any;
  products: Product[] = [];

  constructor(private myProducts: ProductService) {
    this.refreshTotal();
  }

  ngOnInit(): void {
    this.myProducts.getUser(1).subscribe({
      next: (userData) => {
        this.User = userData;
        for (const key in this.User) {
          this.User = this.User[key];
        }
        if (this.User.cart) {
          for (let i = 0; i < this.User.cart.length; i++) {
            this.myProducts.getSupplements(this.User.cart[i].id).subscribe({
              next: (productData) => {
                this.product = productData;
                for (const key in this.product) {
                  this.products.push(this.product[key]);
                }
                if (!this.products) this.products = [];
              },
              error: () => console.log('Error!'),
            });
          }
        }
      },
      error: () => console.log('Error!'),
    });
  }
  getSubtotal(data: any) {
    this.subTotalArr[data.id] = data;
    this.refreshTotal();
  }

  refreshTotal() {
    this.subTotal = 0;
    this.subTotalArr.forEach((element) => {
      this.subTotal += +element.subTotal;
    });
  }
}
