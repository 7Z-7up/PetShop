import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Helpers/users';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private Dogs_URL =
    'https://petshop-c2ff5-default-rtdb.firebaseio.com/dogs%20supplements.json';
  private Users_URL = 'http://localhost:3000/Users';

  constructor(private httpClient: HttpClient) {}

  getAllDogSupplements() {
    return this.httpClient.get(this.Dogs_URL);
  }

  getDogSupplements(id: number) {
    return this.httpClient.get(`${this.Dogs_URL}/${id}`);
  }

  getUser(id: number) {
    return this.httpClient.get(`${this.Users_URL}/${id}`);
  }

  updateUser(updatedUser: User) {
    return this.httpClient.patch(
      `${this.Users_URL}/${updatedUser.id}`,
      updatedUser
    );
  }
}
