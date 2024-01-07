import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { User } from '../../Helpers/users';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-hover',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [ProductService],
  templateUrl: './cart-hover.component.html',
  styleUrl: './cart-hover.component.css',
})
export class CartHoverComponent implements OnInit {
  User: User = { id: 0, cart: [] };
  quantity: any;
  products: any[] = [];
  subTotal = 0;

  constructor(private myService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.myService.getUser(1).subscribe({
      next: (userData: any) => {
        for (const key in userData) {
          this.User = userData[key];
        }
        if (this.User.cart) {
          for (let i = 0; i < this.User.cart.length; i++) {
            this.myService.getSupplements(this.User.cart[i].id).subscribe({
              next: (productData: any) => {
                for (const key in productData) {
                  productData[key].quan = this.User.cart[i].quantity;
                  this.products.push(productData[key]);
                }
              },
              error: () => console.log('Error!'),
              complete: () => this.refreshTotal(),
            });
          }
        }
      },
      error: () => console.log('Error!'),
    });
  }
  deleteProduct(id: number) {
    if (confirm('Do you want to delete this product from cart?')) {
      this.User.cart = this.User.cart.filter((item: any) => item.id !== id);
      this.myService.updateUser(this.User).subscribe({
        next: () => console.log('Deleted'),
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
