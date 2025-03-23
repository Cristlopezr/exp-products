import { AxiosAdapter } from "../adapters/http/axios-adapter";

export const productApi = new AxiosAdapter({
  baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL!,
});
