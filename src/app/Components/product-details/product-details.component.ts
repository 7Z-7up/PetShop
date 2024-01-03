import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  constructor(
    private myActivated: ActivatedRoute,
    private myProduct: ProductService
  ) {
    this.ID = myActivated.snapshot.params['id'];
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
    const filledStars = '★'.repeat(Math.floor(rating));
    const decimalPart = rating % 1;
    let halfStar = '';
    if (decimalPart > 0 && decimalPart <= 0.5) {
      halfStar = '★';
    } else if (decimalPart > 0.5) {
      halfStar = '★★';
    }
    const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
    return filledStars + halfStar + emptyStars;
  }

  generateQuantityOptions(maxQuantity: number): number[] {
    // Generate an array of numbers from 1 to maxQuantity
    return Array.from({ length: maxQuantity }, (_, index) => index + 1);
  }

  selectQuantity(quantity: number): void {
    this.selectedQuantity = quantity;
  }
}
