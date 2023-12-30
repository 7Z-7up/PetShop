import { Product } from './products';

export class User {
  id?: number;
  cart?: { id: number; quantity: number; category: string }[];
}
