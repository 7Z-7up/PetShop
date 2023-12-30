import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartElementComponent } from '../cart-element/cart-element.component';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../Helpers/users';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CartElementComponent,
    HttpClientModule,
  ],
  providers: [ProductService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  subTotal = 0;

  User!: User;

  products: Product[] = [];

  constructor(private myProducts: ProductService) {
    this.myProducts.getAllDogSupplements().subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    });
    this.myProducts.getUser(1).subscribe({
      next: (userData) => {
        this.User = userData;
        for (let i = 0; i < this.User.cart!.length; i++) {
          if (this.User.cart![i].category === 'dog') {
            this.myProducts.getDogSupplements(this.User.cart![i].id).subscribe({
              next: (productData) => this.products.push(productData),
              error: () => console.log('Error!'),
            });
          }
        }
      },
      error: () => console.log('Error!'),
    });
    this.refreshTotal();
  }

  ngOnInit(): void {}

  refreshTotal() {
    // this.subTotal = 0;
    // this.User.cart?.forEach((product: any) => {
    //   this.subTotal += product.price * product.quantity;
    // });
  }

  // upQuantity(id: number) {
  //   let currentID = this.test.findIndex((x: any) => x.id == id);
  //   this.test[currentID].quantity += 1;
  //   this.refreshTotal();
  // }
  // downQuantity(id: number) {
  //   let currentID = this.test.findIndex((x: any) => x.id == id);
  //   if (this.test[currentID].quantity > 1) {
  //     this.test[currentID].quantity -= 1;
  //   } else {
  //     let option = confirm('are you sure you wanna delete?');
  //     if (option)
  //       this.test = this.test.filter((product: any) => product.id != id);
  //   }
  //   this.refreshTotal();
  // }

  // deleteProduct(id: number) {
  //   this.test = this.test.filter((product: any) => product.id != id);
  //   this.refreshTotal();
  // }
}
