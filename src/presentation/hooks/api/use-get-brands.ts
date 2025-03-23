import { productApi } from "@/src/config/api/products-api";
import { getBrandsUseCase } from "@/src/domain/use-cases/brands/get-brands.use-case";
import { useQuery } from "@tanstack/react-query";

export default function useGetBrands() {
  const query = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getBrandsUseCase(productApi),
  });

  return query;
}
