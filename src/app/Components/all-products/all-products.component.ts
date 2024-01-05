import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Helpers/products';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    FormsModule,
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

  constructor(private myProducts: ProductService) {}

  ngOnInit(): void {
    this.myProducts.getAllSupplements().subscribe({
      next: (data) => (this.Products = this.Products.concat(data)),
      error: () => console.log('Error getting the data!'),
      complete: () => this.allproducts(),
    });
  }

  filter(name: string = '', id: number = 0) {
    this.backgroundUpdate(id);
    if (name === '' && id === 0)
      this.filterdproduct = this.Products.slice(1, 50);
    else
      this.filterdproduct = this.Products.filter(
        (product) => product.categories === name
      );
    // console.log(this.filterdproduct);
    this.defaultfilterdproduct = [...this.filterdproduct];
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
    this.filter('bird', 5);
  }

  displayStars(rating: any) {
    let fullStars = Math.floor(rating);
    let decimalPart = rating - fullStars;

    const starsArray: string[] = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsArray.push('fas fa-star');
      } else {
        if (decimalPart > 0) {
          if (decimalPart >= 0.25 && decimalPart <= 0.75) {
            starsArray.push('fas fa-star-half-alt');
            decimalPart = 0;
          } else if (decimalPart > 0.75) {
            starsArray.push('fas fa-star');
            decimalPart = 0;
          } else {
            starsArray.push('far fa-star');
          }
        } else {
          starsArray.push('far fa-star');
        }
      }
    }

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
}
