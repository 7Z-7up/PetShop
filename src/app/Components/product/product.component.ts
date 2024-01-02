import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../Helpers/products';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
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
    this.myProduct.getDogSupplements(this.ID).subscribe({
      next: (data) => {
        this.product = data;
        for (const key in this.product) {
          this.product = this.product[key];
          for (const key in this.product) {
            if (key === 'quantity') {
              this.quantityOptions = this.generateQuantityOptions(this.product[key]);
            }
          }
        }
      },
      error: () => console.log('Error getting product data!'),
    });
  }

  displayStars(rating: number){
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
