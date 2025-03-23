import { create } from "zustand";

type Store = {
  barcode: string;
  openDate: Date | undefined;
  setBarcode: (barcode: string) => void;
  setOpenDate: (openDate: Date) => void;
};

export const useStore = create<Store>()((set) => ({
  barcode: "",
  openDate: undefined,
  setBarcode: (barcode: string) => set({ barcode }),
  setOpenDate: (openDate: Date) => set({ openDate }),
}));
