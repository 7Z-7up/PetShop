import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';
import { User } from '../../Helpers/users';
import { CartServiceService } from '../../Services/cart.service';

@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [ProductService],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.css',
})
export class ProductsCategoryComponent implements OnInit {
  products: Product[] = [];
  User: User = { id: 0, cart: [] };
  dummy = [1, 2, 3, 4];

  constructor(
    private myProducts: ProductService,
    private cartService: CartServiceService
  ) {}

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
      .slice(0, 4);
    // this.filterdproduct.slice
  }
  getcats() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'cat')
      .slice(0, 4);
  }
  getdogs() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'dog')
      .slice(0, 4);
  }
  getbirds() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'bird')
      .slice(0, 4);
  }
  gethamester() {
    this.filterdproduct = this.products
      .filter((product) => product.categories === 'rodents')
      .slice(0, 4);
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
      },
      error: () => console.log('Could not Add!'),
    });
  }
}
