import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
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
