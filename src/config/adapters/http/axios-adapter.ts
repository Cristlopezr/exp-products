import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http-adapter";
import { CustomError } from "@/src/infrastructure/api/custom-error";

type Options = {
  baseUrl: string;
  params?: string;
};

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
    });
  }
  async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url, options);
      return data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw new CustomError(
          "Ha ocurrido un error al procesar la solicitud. Inténtalo de nuevo más tarde.",
          error.response?.status,
        );
      }
      throw new CustomError("Ha ocurrido un error inesperado. Comprueba tu conexión a internet.");
    }
  }
  async post<T>(url: string, data: any, options?: Record<string, unknown>): Promise<T | void> {
    try {
      const { data: responseData } = await this.axiosInstance.post<T>(url, data, options);
      return responseData;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw new CustomError(
          "Ha ocurrido un error al procesar la solicitud. Inténtalo de nuevo más tarde.",
          error.response?.status,
        );
      }
      throw new CustomError("Ha ocurrido un error inesperado. Comprueba tu conexión a internet.");
    }
  }
}
