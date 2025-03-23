import { NewProduct } from "../../entities/product";
import { HttpAdapter } from "../../../config/adapters/http/http-adapter";

export async function postProductUseCase(fetcher: HttpAdapter, product: NewProduct) {
  try {
    await fetcher.post("/products", product);
  } catch (error) {
    throw error;
  }
}
