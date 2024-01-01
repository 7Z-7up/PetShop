import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Helpers/users';
import { Product } from '../Helpers/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private Dogs_URL =
    'https://petshop-c2ff5-default-rtdb.firebaseio.com/dogs-supplements';
  private Users_URL =
    'https://petshop-c2ff5-default-rtdb.firebaseio.com/Users.json';
  private key?: string;

  constructor(private httpClient: HttpClient) {}

  getAllDogSupplements() {
    return this.httpClient.get(this.Dogs_URL + '.json');
  }

  addDogSupplements(product: Product) {
    return this.httpClient.post(this.Dogs_URL + '.json', product);
  }

  updateDogSupplements(product: Product) {
    return this.httpClient.patch(
      `${this.Dogs_URL + '.json'}/${product.id}`,
      product
    );
  }

  // deleteDogSupplements(id: number) {
  //   return this.httpClient.delete(this.Dogs_URL2 + `/${id}.json`);
  // }
  deleteDogsupplements(id: number) {
    this.getDogSupplements(id).subscribe({
      next: (productData) => {
        for (const key in productData) {
          this.deleteDogSupplement(key).subscribe({
            next: () => console.log('Deleted'),
            error: () => console.log('Could not delete'),
          });
        }
      },
    });
  }

  private deleteDogSupplement(key: string) {
    return this.httpClient.delete(this.Dogs_URL + '.json' + `/${key}.json`);
  }

  getDogSupplements(id: number) {
    return this.httpClient.get(this.Dogs_URL + '.json', {
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
