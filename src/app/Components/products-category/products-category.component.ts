import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [ProductService],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.css',
})
export class ProductsCategoryComponent {
  products: Product[] = [];

  constructor(private myProducts: ProductService) {
    myProducts.getAllSupplements().subscribe({
      next: (data) => (this.products = this.products.concat(data)),
      error: (err) => console.log(err),
      complete: () => this.getbirds(),
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

  addToCart(id?: number, category?: string) {
    console.log(id, category);
    // console.log(this.user)
  }
}
