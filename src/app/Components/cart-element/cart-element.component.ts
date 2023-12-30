import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: '[app-cart-element]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-element.component.html',
  styleUrl: './cart-element.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartElementComponent implements OnInit {
  @Input() product?: any;
  @Input() userID?: any;

  subTotal = 0;

  constructor(private myService: ProductService) {}
  ngOnInit(): void {}
  // ngOnInit(): void {
  //   this.refreshTotal();
  // }

  refreshTotal() {
    // this.subTotal = 0;
    // this.test.forEach((product: any) => {
    //   this.subTotal += product.price * product.quantity;
    // });
  }

  upQuantity() {
    this.product.quantity += 1;
    this.refreshTotal();
  }
  downQuantity() {
    if (this.product.quantity > 1) {
      this.product.quantity -= 1;
    } else {
      let option = confirm('are you sure you wanna delete?');
      if (option) alert('deleted');
      // this.cartProduct = this.test.filter((product: any) => product.id != id);
    }
    this.refreshTotal();
  }

  deleteProduct() {
    // this.test = this.test.filter((product: any) => product.id != id);
    this.refreshTotal();
  }
}
