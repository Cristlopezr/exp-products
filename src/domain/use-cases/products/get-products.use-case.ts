import { HttpAdapter } from "@/src/config/adapters/http/http-adapter";
import { ProductResponse } from "@/src/infrastructure/interfaces/productsApi.interface";
import { ProductMapper } from "@/src/infrastructure/mappers/product-mapper";

export async function getProductsUseCase(fetcher: HttpAdapter) {
  try {
    const data = await fetcher.get<ProductResponse[]>("/products");
    return data.map(ProductMapper.productResponseToEntity);
  } catch (error) {
    throw new Error(`Ha ocurrido un error al procesar la solicitud.`);
  }
}
