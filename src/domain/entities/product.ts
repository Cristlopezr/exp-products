export interface NewProduct {
  barcode: string;
  openDate: Date;
}

export interface Product {
  id: string;
  openDate: Date;
  expireDateAfterOpen: Date;
  isExpired: string;
  name: string;
  quantity: string;
  brand: string;
  daysToExpire: number;
}
