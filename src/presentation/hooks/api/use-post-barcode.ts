import { productApi } from "@/src/config/api/products-api";
import { Barcode } from "@/src/domain/entities/barcode";
import { newBarcodeUseCase } from "@/src/domain/use-cases/barcode/post-barcode.use-case";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function usePostBarcode() {
  return useMutation({
    mutationFn: async (newBarcode: Barcode) => await newBarcodeUseCase(productApi, newBarcode),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Exito!",
        text2: "Código agregado correctamente.",
      });
      router.dismissTo("/");
    },
  });
}
