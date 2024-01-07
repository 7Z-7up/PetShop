import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import {
  ActivatedRoute,
  ActivationEnd,
  Router,
  RouterLink,
} from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  providers: [ProductService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  ID: number = 0;
  product?: any;
  selectedQuantity: number | undefined;
  quantityOptions: number[] = [];
  constructor(private myProduct: ProductService, router: Router) {
    router.events.subscribe((data) => {
      if (data instanceof ActivationEnd) {
        this.ID = data.snapshot.params['id'];
        this.ngOnInit();
      }
    });
  }
  ngOnInit(): void {
    this.myProduct.getSupplements(this.ID).subscribe({
      next: (data) => {
        this.product = data;
        for (const key in this.product) {
          // this.product = this.product[key];
          this.product = this.product[key];
          for (const key in this.product) {
            if (key === 'quantity') {
              this.quantityOptions = this.generateQuantityOptions(
                this.product[key]
              );
            }
          }
        }
      },
      error: () => console.log('Error getting product data!'),
    });
  }

  displayStars(rating: number) {
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

  generateQuantityOptions(maxQuantity: number): number[] {
    // Generate an array of numbers from 1 to maxQuantity
    return Array.from({ length: maxQuantity }, (_, index) => index + 1);
  }

  selectQuantity(quantity: number): void {
    this.selectedQuantity = quantity;
  }

  addToCart() {}
  buyNow() {}
  changeImage() {}
}
