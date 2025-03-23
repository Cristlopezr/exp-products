import { Product } from "@/src/domain/entities/product";
import { ProductResponse } from "../interfaces/productsApi.interface";

export class ProductMapper {
  static productResponseToEntity(productResponse: ProductResponse): Product {
    return {
      brand: productResponse.barcodeInfo.brand.name ?? "Sin marca",
      id: productResponse.id,
      expireDateAfterOpen: new Date(productResponse.expireDateAfterOpen),
      isExpired: ProductMapper.calculateDaysToExpire(productResponse.expireDateAfterOpen) < 0 ? "Vencido" : "Bueno",
      name: productResponse.barcodeInfo.name,
      openDate: new Date(productResponse.openDate),
      quantity: productResponse.barcodeInfo.quantity,
      daysToExpire: ProductMapper.calculateDaysToExpire(productResponse.expireDateAfterOpen),
    };
  }

  private static calculateDaysToExpire(expireDate: string) {
    const difference = new Date(expireDate).getTime() - new Date().getTime();

    const days = Math.round(difference / (1000 * 60 * 60 * 24));

    return days;
  }
}
