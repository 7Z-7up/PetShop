import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Helpers/products';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  providers: [ProductService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private myService: ProductService) {}
  Products: Product[] = [];

  ngOnInit(): void {
    this.myService.getAllSupplements().subscribe({
      next: (data) => (this.Products = this.Products.concat(data)),
      error: () => console.log('Error getting the data!'),
    });
  }
}
