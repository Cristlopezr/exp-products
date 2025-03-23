import { HttpAdapter } from "@/src/config/adapters/http/http-adapter";
import { BrandResponse } from "@/src/infrastructure/interfaces/productsApi.interface";

export async function getBrandsUseCase(fetcher: HttpAdapter) {
  try {
    return await fetcher.get<BrandResponse[]>("/brands");
  } catch (error) {
    throw new Error(`Ocurrio un erro al obtener las marcas.`);
  }
}
