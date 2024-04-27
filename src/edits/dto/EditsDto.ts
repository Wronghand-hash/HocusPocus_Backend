/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class EditDto {
  title: string;

  price: number;

  quantity: string;

  description: string;

  inStock: string;

  brand: string;

  type: string;

  category: string;

  design: string;

  rarity: string;

  id: string;

  trainer: string;
}
