import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface cartItem {
  id: number;
  quantity: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private Users_URL = 'https://petshop-c2ff5-default-rtdb.firebaseio.com/Users';

  cartItems$: BehaviorSubject<cartItem[]> = new BehaviorSubject<cartItem[]>([]);

  constructor(private httpClient: HttpClient) {}

  getCart(id: number = 1) {
    return this.httpClient
      .get<cartItem[]>(this.Users_URL + `/${id}/cart.json`)
      .subscribe((data) => {
        console.log(data);
        this.cartItems$.next(data);
      });
  }
}
