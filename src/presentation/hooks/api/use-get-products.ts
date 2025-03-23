import { productApi } from "@/src/config/api/products-api";
import { getProductsUseCase } from "@/src/domain/use-cases/products/get-products.use-case";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProductsUseCase(productApi),
    retry: false,
  });

  return query;
}
