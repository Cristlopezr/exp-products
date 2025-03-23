import { HttpAdapter } from "../../../config/adapters/http/http-adapter";
export async function postNewBrandUseCase(fetcher: HttpAdapter, newBrand: string) {
  try {
    await fetcher.post("/brands", {
      name: newBrand,
    });
  } catch (error) {
    throw new Error(`Ha ocurrido un error al procesar la solicitud.`);
  }
}
