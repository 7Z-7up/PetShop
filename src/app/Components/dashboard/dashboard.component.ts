import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  providers: [ProductService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private myService: ProductService) {}
  Products: Product[] = [];

  ngOnInit(): void {
    // this.Products = [];

    this.myService.getAllSupplements().subscribe({
      next: (data) => {
        this.Products = this.Products.concat(data);
      },
      error: () => console.log('Error getting the data!'),
    });
  }

  deleteProduct(id: any) {
    this.Products = this.Products.filter((element) => element.id != id);

    this.myService.deleteSupplement(this.Products).subscribe({
      next: () => console.log('Deleted'),
      error: () => console.log('Could not delete'),
      // complete: () => this.ngOnInit(),
    });
  }
}
