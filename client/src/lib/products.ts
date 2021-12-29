import products from '../perfumes';
export const API_SERVER = "http://localhost:8080";

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

export const getProducts = (): Promise<Product[]> => {
  try {
    return fetch(`${API_SERVER}/products`).then((res) => res.json()).catch(()=> products);
  } catch (error) {
    throw new Error("API down");
  }
}

export const getProductById = (id: string): Promise<Product> =>
{
  try {
    return fetch(`${API_SERVER}/products/${id}`).then((res) => res.json());
  } catch (error) {
    throw new Error("API down");
  }
}

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});