import { productApi } from "@/src/config/api/products-api";
import { NewProduct } from "@/src/domain/entities/product";
import { postProductUseCase } from "@/src/domain/use-cases/products/post-product.use-case";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function usePostProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: NewProduct) => await postProductUseCase(productApi, newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Toast.show({
        type: "success",
        text1: "Exito!",
        text2: "Producto agregado correctamente.",
      });
      router.back();
    },
  });
}
