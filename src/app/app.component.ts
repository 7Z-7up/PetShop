import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { FooterComponent } from './Components/footer/footer.component';

import { NavbarComponent } from './Components/navbar/navbar/navbar/navbar.component';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ShoppingCartComponent,FooterComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
