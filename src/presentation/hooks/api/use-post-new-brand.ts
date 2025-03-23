import { productApi } from "@/src/config/api/products-api";
import { postNewBrandUseCase } from "@/src/domain/use-cases/brands/post-brand.use-case";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export default function usePostNewBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBrand: string) => await postNewBrandUseCase(productApi, newBrand),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
      Toast.show({
        type: "success",
        text1: "Exito!",
        text2: "Marca agregada correctamente.",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message ?? "Ha ocurrido un error, intentelo de nuevo más tarde.",
      });
    },
  });
}
