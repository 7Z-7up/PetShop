import { Component } from '@angular/core';
import { CartHoverComponent } from '../cart-hover/cart-hover.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CartHoverComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {}
