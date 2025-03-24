import { Product } from "@/src/domain/entities/product";
import { ProductResponse } from "../interfaces/productsApi.interface";

export class ProductMapper {
  static productResponseToEntity(productResponse: ProductResponse): Product {
    return {
      brand: productResponse.barcodeInfo.brand.name ?? "Sin marca",
      id: productResponse.id,
      expireDateAfterOpen: new Date(productResponse.expireDateAfterOpen),
      isExpired: productResponse.isExpired ? "Vencido" : "Bueno",
      name: productResponse.barcodeInfo.name,
      openDate: new Date(productResponse.openDate),
      quantity: productResponse.barcodeInfo.quantity,
      daysToExpire: ProductMapper.calculateDaysToExpire(productResponse.expireDateAfterOpen),
    };
  }

  private static calculateDaysToExpire(expireDate: string) {
    const now = new Date();

    const timeOffset = now.getTimezoneOffset() / 60;

    now.setHours(now.getHours() - timeOffset);

    const expire = new Date(expireDate);

    expire.setHours(expire.getHours() - timeOffset);

    const difference = expire.getTime() - now.getTime();

    //Days Left
    return Math.round(difference / (1000 * 60 * 60 * 24));
  }
}
