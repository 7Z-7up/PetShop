import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { ProductsCategoryComponent } from '../products-category/products-category.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    SliderComponent,
    ProductsCategoryComponent,
  ],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
