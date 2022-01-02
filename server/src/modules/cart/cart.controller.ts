import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
  Delete,
} from '@nestjs/common';

import products, { Product } from '../../products';

interface CartItem extends Product {
  quantity: number;
}

interface Cart {
  cartItems: CartItem[];
}

const initialCart = (indexes: number[]): Cart => ({
  cartItems: indexes.map((index) => ({
    ...products[index],
    quantity: 1,
  })),
});
@Controller('cart')
export class CartController {
  private carts: Record<number, Cart> = {
    1: initialCart([0, 2, 4]),
    2: initialCart([1, 3]),
  };

  constructor() {}

  @Get()
  async index(@Request() req): Promise<Cart> {
    return this.carts[1] ?? { cartItems: [] };
  }

  @Post()
  async create(@Request() req, @Body() { id }: { id: string }): Promise<Cart> {
    const cart = this.carts[1];
    console.log("id:", id)
    console.log("user:", req.body.user)
    console.log("userId:", req.body.user.userId)
    id = req.body.user.userId;
    const cartItem = cart.cartItems.find(
      (cartItem) => cartItem.id === parseInt(id),
    );
    console.log("cartItem:", cartItem)

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.cartItems.push({
        ...products.find((product) => product.id === parseInt(id)),
        quantity: 1,
      });
    }
    return cart;
  }

  @Delete()
  async destroy(@Request() req): Promise<Cart> {
    console.log("user:", req.body.user)
    console.log("userId:", req.body.user.userId)
    this.carts[req.body.user.userId] = { cartItems: [] };
    return this.carts[req.body.user.userId];
  }
}
