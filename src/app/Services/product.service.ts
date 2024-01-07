import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Helpers/users';
import { Product } from '../Helpers/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private URL =
    'https://petshop-c2ff5-default-rtdb.firebaseio.com/supplements.json';
  private Users_URL = 'https://petshop-c2ff5-default-rtdb.firebaseio.com/Users';
  private key?: string;

  constructor(private httpClient: HttpClient) {}

  getAllSupplements() {
    return this.httpClient.get(this.URL);
  }

  addSupplements(product: Product) {
    return this.httpClient.post(this.URL, product);
  }

  updateSupplements(product: any) {
    return this.httpClient.patch(`${this.URL}/${product.id}.json`, product);
  }

  deleteSupplement(products: Product[]) {
    return this.httpClient.put(this.URL, products);
  }

  getSupplements(id: number) {
    return this.httpClient.get(this.URL, {
      params: new HttpParams().set('orderBy', '"id"').set('equalTo', id),
    });
  }

  getUser(id: number) {
    return this.httpClient.get(this.Users_URL + '.json', {
      params: new HttpParams().set('orderBy', '"id"').set('equalTo', id),
    });
  }
  updateUser(updatedUser: User) {
    return this.httpClient.patch(
      `${this.Users_URL}/${updatedUser.id}.json`,
      updatedUser
    );
  }
}
