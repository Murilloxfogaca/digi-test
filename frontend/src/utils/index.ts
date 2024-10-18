import nookies from "nookies";
import jsonProducts from "../../../products.json";
export const Products: iProduct[] = jsonProducts;

export interface iProduct {
  name: string;
  detail: string;
  price: string;
  image: string;
  hero?: string;
  info?: string;
  offer?: string;
}

export function getCartFromCookies() {
  const cookies = nookies.get();
  const cart = cookies.cart ? JSON.parse(cookies.cart) : [];
  return cart;
}

export function saveCartToCookies(cart: iProduct[]) {
  nookies.set(null, "cart", JSON.stringify(cart), {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
}

export function addToCart(product: iProduct) {
  const cart = getCartFromCookies();
  const updatedCart = [...cart, product];
  saveCartToCookies(updatedCart);
}

export function removeFromCart(productName: string) {
  let cart = getCartFromCookies();
  cart = cart.filter((item: iProduct) => item.name !== productName);
  saveCartToCookies(cart);
}

export function updateCartProduct(product: iProduct) {
  const cart = getCartFromCookies();
  const index = cart.findIndex((item: iProduct) => item.name === product.name);

  if (index !== -1) {
    cart[index] = product;
    saveCartToCookies(cart);
  }
}

export function clearCart() {
  saveCartToCookies([]);
}

export function encodeURL(url: string): string {
  return encodeURIComponent(url);
}
export function decodeURL(encodedUrl: string): string {
  return decodeURIComponent(encodedUrl);
}
