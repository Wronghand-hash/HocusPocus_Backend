/* eslint-disable prettier/prettier */
import { JsonArray } from '@prisma/client/runtime/library';

export class OrderItemsDto {
  items: JsonArray;

  order_id: string;
}
