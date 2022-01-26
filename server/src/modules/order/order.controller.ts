import { ConfigModule } from '@nestjs/config';
/* eslint-disable @typescript-eslint/no-var-requires */
const paypal = require('@paypal/checkout-server-sdk');

import { Controller, Request, Response, Post, Get } from '@nestjs/common';

ConfigModule.forRoot({
  envFilePath: '.env',
});

/* const Environment =
  process.env.NODE_ENV === 'production'
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment; */

const Environment =
  process.env.NODE_ENV === 'production'
    ? paypal.core.SandboxEnvironment
    : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET,
  ),
);

import products from '../../products';

@Controller('order')
export class OrderController {
  constructor() {}

  @Get()
  async order(@Response() res) {
    console.log('PAYPAL_CLIENT_ID:', process.env.PAYPAL_CLIENT_ID);

    return {
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
    }
  }

  @Post()
  async post(@Request() req) {
    const request = new paypal.orders.OrdersCreateRequest();
    console.log('items:', req.body.items);
    const total = req.body.items.reduce((sum, item) => {
      return (
        sum +
        products.find((product) => product.id === item.id).price * item.quantity
      );
    }, 0);
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: total,
              },
            },
          },
          items: req.body.items.map((item) => {
            const storeItem = products.find(
              (product) => product.id === item.id,
            ); //products[item.id]
            return {
              name: storeItem.title,
              unit_amount: {
                currency_code: 'USD',
                value: storeItem.price,
              },
              quantity: item.quantity,
            };
          }),
        },
      ],
    });

    try {
      const order = await paypalClient.execute(request);
      console.log('order:', order);
      return { id: order.result.id, 'client-id': order.result.id };
      //return { 'client-id': order.result.id };
    } catch (e) {
      return { error: e.message };
    }
  }
}
