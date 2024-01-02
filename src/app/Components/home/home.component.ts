import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, ProductComponent],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  Products: Product[] = [];
  constructor(private myProducts: ProductService) {}
  ngOnInit(): void {
    this.myProducts.getAllDogSupplements().subscribe({
      next: (data) => (this.Products = this.Products.concat(data)),
      error: () => console.log('Error getting the data!'),
    });
  }
}
