import { Component, OnInit } from '@angular/core';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';
import { CartServiceService } from '../../Services/cart.service';
import { User } from '../../Helpers/users';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivationEnd, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  Products: Product[] = [];
  filterdproduct: Product[] = [];
  User: User = { id: 0, cart: [] };
  query: string = '';
  dummy = [1, 2, 3, 4];

  page: number = 1;
  total: number = this.filterdproduct.length;
  itemsInPage: number = 12;

  checkDescription: boolean = false;

  constructor(
    private myProducts: ProductService,
    private cartService: CartServiceService,
    private router: Router
  ) {
    this.router.events.subscribe((data) => {
      if (data instanceof ActivationEnd) {
        this.query = data.snapshot.params['query'];
        this.filter(this.query);

        // console.log(this.query);
      }
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
        // console.log(this.Products);
      },
      error: () => console.log('Error getting the data!'),
      complete: () => this.filter(this.query),
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
    });
  }

  filter(query: string = '') {
    // console.log(this.Products);
    if (query === '') this.filterdproduct = this.Products;
    else {
      if (this.checkDescription) {
        this.filterdproduct = this.Products.filter(
          (product) =>
            product.name?.toLowerCase().includes(query.toLowerCase()) ||
            product.description?.toLowerCase().includes(query.toLowerCase())
        );
      } else
        this.filterdproduct = this.Products.filter((product) =>
          product.name?.toLowerCase().includes(query.toLowerCase())
        );
    }
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

  changeValue(val: number) {
    this.itemsInPage = val;
    this.page = 1;
    this.total = this.filterdproduct.length;
  }
  changePage(event: any) {
    this.page = event;
    this.total = this.filterdproduct.length;
  }

  changed(checked: any) {
    this.checkDescription = !this.checkDescription;
    this.filter(this.query);
  }

  search(query: string) {
    this.router.navigateByUrl(`/search/${query}`);
  }
}
