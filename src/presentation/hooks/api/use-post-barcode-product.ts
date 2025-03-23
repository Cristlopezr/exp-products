import { productApi } from "@/src/config/api/products-api";
import { NewBarcodeWithOpenProduct } from "@/src/domain/entities/barcode";
import { newBarcodeWithProductUseCase } from "@/src/domain/use-cases/barcode/post-barcode-product.use-case";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function usePostBarcodeProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBarcode: NewBarcodeWithOpenProduct) =>
      await newBarcodeWithProductUseCase(productApi, newBarcode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Toast.show({
        type: "success",
        text1: "Exito!",
        text2: "Código y producto agregado correctamente.",
      });
      router.dismissTo("/");
    },
  });
}
