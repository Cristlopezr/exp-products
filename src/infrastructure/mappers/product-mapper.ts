import { Product } from "@/src/domain/entities/product";
import { ProductResponse } from "../interfaces/productsApi.interface";

export class ProductMapper {
  static productResponseToEntity(productResponse: ProductResponse): Product {
    return {
      brand: productResponse.barcodeInfo.brand.name ?? "Sin marca",
      id: productResponse.id,
      expireDateAfterOpen: new Date(productResponse.expireDateAfterOpen),
      isExpired:
        ProductMapper.calculateTimeToExpire(productResponse.expireDateAfterOpen, "seconds") < 0 ? "Vencido" : "Bueno",
      name: productResponse.barcodeInfo.name,
      openDate: new Date(productResponse.openDate),
      quantity: productResponse.barcodeInfo.quantity,
      daysToExpire: ProductMapper.calculateTimeToExpire(productResponse.expireDateAfterOpen, "minutes"),
    };
  }

  private static calculateTimeToExpire(expireDate: string, type: "minutes" | "seconds"): number {
    const now = new Date();

    const timeOffset = now.getTimezoneOffset() / 60;

    now.setHours(now.getHours() - timeOffset);

    const expire = new Date(expireDate);

    expire.setHours(expire.getHours() - timeOffset);

    const differenceInMilliseconds = expire.getTime() - now.getTime();

    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    return type === "minutes" ? Math.floor(differenceInSeconds / 60) : differenceInSeconds;
  }
}
