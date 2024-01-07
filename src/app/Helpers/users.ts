import { Product } from './products';

export class User {
  id = 0;
  cart: { id: number; quantity: number; category: string }[] = [];
}
