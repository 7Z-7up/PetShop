import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  product = new FormGroup({
    name: new FormControl(null, Validators.required),
    id: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required),
    seller: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
  });

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

  page = 1;
  total: number = this.Products.length;
  itemsInPage: any = 12;
  changeValue(val: number) {
    this.itemsInPage = val;
    this.page = 1;
    this.total = this.Products.length;
  }

  changePage(event: any) {
    this.page = event;
    this.total = this.Products.length;
  }
  save() {
    console.log('added');
    this.product.reset();
    this.closebutton.nativeElement.click();
  }
}
