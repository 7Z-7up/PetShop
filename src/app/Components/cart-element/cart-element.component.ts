import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: '[app-cart-element]',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './cart-element.component.html',
  styleUrl: './cart-element.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartElementComponent implements OnInit {
  @Input() product?: any;
  @Input() user?: any;

  @Output() setSubTotal = new EventEmitter();
  subTotal = 0;

  constructor(private myService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // console.log(this.user.cart);
    let quanID!: number;

    this.user.cart.forEach((element: any) => {
      if (element.id == this.product.id) {
        quanID = element.id;
        this.product.quan = element.quantity;
      }
    });

    this.refreshTotal();
  }

  refreshTotal() {
    this.subTotal = this.product.quan * this.product.price;
    this.setSubTotal.emit({ id: this.product.id, subTotal: this.subTotal });
  }

  upQuantity() {
    if (this.product.quan < 9) this.product.quan += 1;
    let keyUpdate = 0;

    for (const key in this.user.cart) {
      if (this.product.id == this.user.cart[key].id) {
        keyUpdate = +key;
      }
    }
    this.user.cart[keyUpdate].quantity++;
    this.myService.updateUser(this.user).subscribe({
      next: () => console.log('Success Updating'),
      error: () => console.log('Error Updating'),
    });
    this.refreshTotal();
  }
  downQuantity() {
    let keyUpdate = 0;

    for (const key in this.user.cart) {
      if (this.product.id == this.user.cart[key].id) {
        keyUpdate = +key;
      }
    }
    if (this.user.cart[keyUpdate].quantity > 1) {
      this.product.quan -= 1;
      this.user.cart[keyUpdate].quantity--;
      this.myService.updateUser(this.user).subscribe({
        next: () => console.log('Success Updating'),
        error: () => console.log('Error Updating'),
      });
    } else {
      if (confirm('Do you want to delete this product from cart?')) {
        this.user.cart = this.user.cart.filter(
          (item: any) => item.id !== this.product.id
        );
        this.myService.updateUser(this.user).subscribe({
          next: () =>
            this.router
              .navigateByUrl('/home', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/shopping-cart']);
              }),
          error: () => console.log('Error Updating'),
        });
      }
    }
    this.refreshTotal();
  }

  deleteProduct() {
    if (confirm('Do you want to delete this product from cart?')) {
      this.user.cart = this.user.cart.filter(
        (item: any) => item.id !== this.product.id
      );
      this.myService.updateUser(this.user).subscribe({
        next: () =>
          this.router
            .navigateByUrl('/home', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/shopping-cart']);
            }),
        error: () => console.log('Error Updating'),
      });
    }
    this.refreshTotal();
  }
}
