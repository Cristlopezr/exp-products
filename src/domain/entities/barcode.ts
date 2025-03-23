export interface Barcode {
  barcode: string;
  name: string;
  quantity: string;
  daysToExpireAfterOpen: number;
  brand: number;
}

export interface NewBarcodeWithOpenProduct extends Barcode {
  openDate: Date;
}
