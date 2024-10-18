import { iProduct, Products } from "@/utils";

export function getAllProducts() {
  return Products;
}

export function getSingleProducts(slug: string): iProduct | undefined {
  return Products.find(({ name }) => name === slug);
}

export function getSingleProductHero(): iProduct | undefined {
  return Products.find(({ hero }) => typeof hero !== "undefined");
}
