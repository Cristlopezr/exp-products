export interface ProductResponse {
  id: string;
  openDate: string;
  expireDateAfterOpen: string;
  isExpired: boolean;
  barcodeInfo: BarcodeResponse;
}

export interface BarcodeResponse {
  barcode: string;
  name: string;
  quantity: string;
  daysToExpireAfterOpen: string;
  brand: BrandResponse;
}

export interface BrandResponse {
  id: string;
  name: string;
}
