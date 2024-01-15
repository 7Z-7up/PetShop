import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  uploadimage(val: any) {
    let data = val;
    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/dmdg4vamg/image/upload',
      data
    );
  }
}
