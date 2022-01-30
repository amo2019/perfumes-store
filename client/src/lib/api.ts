import products from '../perfumes';
export const API_SERVER = "http://localhost:8080";

export interface User {
  name?: string;
  password?: string;
  status?: string;
  token?: string;
  error?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  size?: string;
  image: string;
  category?: string;
  type: string;
  description: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    try {
      const res = await fetch(`${API_SERVER}/products`);
      return await res.json();
    } catch {
      return products;
    }
  } catch (error) {
    throw new Error("API down");
  }
}

export const getProductById = async (id: string): Promise<Product> =>
{
  try {
    const res = await fetch(`${API_SERVER}/products/${id}`);
    return await res.json();
  } catch (error) {
    throw new Error("API down");
  }
}

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const createProduct = async (text: string): Promise<Product> =>
  fetch(`${API_SERVER}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  }).then((res) => res.json());

export const updateProduct = async (product: Product): Promise<Product> =>
  fetch(`${API_SERVER}/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());

export const deleteProduct = async (product: Product): Promise<Product> =>
  fetch(`${API_SERVER}/products/${product.id}`, {
    method: "DELETE",
  }).then(() => product);
