import { getProducts } from "@/controllers/productController";

export async function GET() {
  return getProducts();
}
