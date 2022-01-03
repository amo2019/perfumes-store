import { BehaviorSubject } from "rxjs";

import type { Product } from "./products";

export interface CartItem extends Product {
  qty: number;
  name: string | undefined;
  quantity: number ;
}

export interface Cart {
  cartItems: CartItem[];
}

const API_SERVER = "http://localhost:8080";

export const cart = new BehaviorSubject<Cart | null>(null);

export const getCart = (): Promise<Cart> =>
  fetch(`${API_SERVER}/cart`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      cart.next(res);
      return res;
    });

export const addToCart = (id: string = "1" ): Promise<void> =>{
  console.log("id:", id)
  return fetch(`${API_SERVER}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: {userId: id} }),
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });
  }

export const clearCart = (id: string = "1"): Promise<void> =>
  fetch(`${API_SERVER}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: {userId: id} }),
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });

    export const deleteOne = (id: string = "1", productId: string, one: string = "0"): Promise<void> => {
      var headers = new Headers();
      headers.append("productId", productId);
      headers.append("one", one);
    
      return fetch(`${API_SERVER}/cart/${productId}/${one}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: {userId: id} }),
    })
      .then((res) => res.json())
      .then(() => {
        getCart();
      });
    }

