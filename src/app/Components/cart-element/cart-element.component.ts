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

  constructor(private myService: ProductService) {}

  ngOnInit(): void {
    // console.log(this.user.cart);
    let quanID!: number;

    this.user.cart.forEach((element: any) => {
      console.log(element.id, this.product.id);
      if (element.id == this.product.id) return (quanID = element.id);
    });

    this.product.quan = quanID;
    // console.log(this.user.cart[this.product.quan].quantity);
    this.refreshTotal();
  }
  // ngOnInit(): void {
  // }

  refreshTotal() {
    this.subTotal = this.product.quan * this.product.price;
    this.setSubTotal.emit({ id: this.product.id, subTotal: this.subTotal });
  }

  upQuantity() {
    this.product.quan += 1;
    let keyUpdate = 0;
    // console.log(keyUpdate);

    for (const key in this.user.cart) {
      if (this.product.id == this.user.cart[key].id) keyUpdate = +key;
    }
    console.log(keyUpdate);
    this.user.cart[keyUpdate].quantity++;
    console.log(this.user);
    // this.myService.updateSupplements(this.product).subscribe({
    //   next: () => console.log('done'),
    //   error: () => console.log('error updating'),
    // });
    this.refreshTotal();
  }
  downQuantity() {
    if (this.product.quan > 1) {
      this.product.quan -= 1;
    } else {
      let option = confirm('are you sure you wanna delete?');
      if (option) alert('deleted');
      // this.cartProduct = this.test.filter((product: any) => product.id != id);
    }
    this.refreshTotal();
  }

  deleteProduct() {
    //   // this.test = this.test.filter((product: any) => product.id != id);
    //   this.refreshTotal();
  }
}
