import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [ProductService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  ID: number = 0;
  product?: any;
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
        }
      },
      error: () => console.log('Error getting product data!'),
    });
  }
}
