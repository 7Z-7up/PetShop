import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Helpers/users';
import { Product } from '../Helpers/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private URL = 'https://petshop-c2ff5-default-rtdb.firebaseio.com/supplements';
  private Users_URL =
    'https://petshop-c2ff5-default-rtdb.firebaseio.com/Users.json';
  private key?: string;

  constructor(private httpClient: HttpClient) {}

  getAllSupplements() {
    return this.httpClient.get(this.URL + '.json');
  }

  addSupplements(product: Product) {
    return this.httpClient.post(this.URL + '.json', product);
  }

  updateSupplements(product: Product) {
    return this.httpClient.patch(
      `${this.URL + '.json'}/${product.id}`,
      product
    );
  }

  deletesupplements(id: number) {
    this.getSupplements(id).subscribe({
      next: (productData) => {
        for (const key in productData) {
          this.deleteSupplement(key).subscribe({
            next: () => console.log('Deleted'),
            error: () => console.log('Could not delete'),
          });
        }
      },
    });
  }

  private deleteSupplement(key: string) {
    return this.httpClient.delete(this.URL + '.json' + `/${key}.json`);
  }

  getSupplements(id: number) {
    return this.httpClient.get(this.URL + '.json', {
      params: new HttpParams().set('orderBy', '"id"').set('equalTo', id),
    });
  }

  getUser(id: number) {
    return this.httpClient.get(this.Users_URL, {
      params: new HttpParams().set('orderBy', '"id"').set('equalTo', id),
    });
  }

  updateUser(updatedUser: User) {
    return this.httpClient.patch(
      `${this.Users_URL}/${updatedUser.id}`,
      updatedUser
    );
  }
}
