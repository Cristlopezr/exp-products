export interface HttpAdapter {
  get<T>(url: string, options?: Record<string, unknown>): Promise<T>;
  post<T>(url: string, data: any, options?: Record<string, unknown>): Promise<T | void>;
}
