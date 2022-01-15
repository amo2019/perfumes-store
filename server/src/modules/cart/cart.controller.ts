import { ConfigModule } from '@nestjs/config';
import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
  Delete,
  Header,
  Param,
  Response,
  Res,
} from '@nestjs/common';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const paypal = require("@paypal/checkout-server-sdk");

const Environment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
)

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
    id = req.body.user.userId;
    const cartItem = cart.cartItems.find(
      (cartItem) => cartItem.id === parseInt(id),
    );

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
    this.carts[req.body.user.userId] = { cartItems: [] };
    return this.carts[req.body.user.userId];
  }
 
  @Delete('/:productId/:one')
  async delete(@Request() req, @Param('productId') productId, @Param('one') one): Promise<Cart> {
    const cart = this.carts[req.body.user.userId];

    const cartItem = cart.cartItems.find(
      (cartItem) => cartItem.id === parseInt(productId),
    );

    if (cartItem.quantity > 1 && one !=='0') {
      cartItem.quantity -= 1;
      return cart;
    } else {
      const filteredCart = cart.cartItems.filter(
        (cartItem) => cartItem.id != parseInt(productId)
      );
      this.carts[req.body.user.userId] = {cartItems:filteredCart};
      return this.carts[req.body.user.userId];
    }
  }  

  @Get()
  async cart(@Response() res) {
    return {
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
    }
  }
  
  
@Post("/order")
async order(@Request() req) {
    const request = new paypal.orders.OrdersCreateRequest()
    const total = req.body.items.reduce((sum, item) => {      
      return sum +  products.find((product) => product.id === item.id).price * item.quantity
    }, 0)
    request.prefer("return=representation")
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              },
            },
          },
          items: req.body.items.map(item => {
            const storeItem = products.find((product) => product.id === item.id)//products[item.id]
            return {
              name: storeItem.title,
              unit_amount: {
                currency_code: "USD",
                value: storeItem.price,
              },
              quantity: item.quantity,
            }
          }),
        },
      ],
    })
  
    try {
      const order = await paypalClient.execute(request)
      return{ id: order.result.id }
    } catch (e) {
      return{ error: e.message }
    }
  }

}