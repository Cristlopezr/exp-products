import { Barcode } from "../../entities/barcode";
import { HttpAdapter } from "../../../config/adapters/http/http-adapter";

export async function newBarcodeUseCase(fetcher: HttpAdapter, newBarcode: Barcode) {
  try {
    await fetcher.post("/barcode", newBarcode);
  } catch (error) {
    throw new Error(`Ha ocurrido un error al procesar la solicitud.`);
  }
}
