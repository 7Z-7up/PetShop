import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { FooterComponent } from './Components/footer/footer.component';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './Components/login/login.component';
import { RegistComponent } from './Components/regist/regist.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ShoppingCartComponent,
    FooterComponent,
    NavbarComponent,
    NgxPaginationModule,
    LoginComponent,
    RegistComponent,
    AngularFireAuthModule,
    AngularFireModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const testCollection = collection(this.firestore, 'test');
    addDoc(testCollection, { text: 'Fuck to the Firebase' });
  }
}
