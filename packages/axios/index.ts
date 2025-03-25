import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios'

abstract class BaseHttpClient {
  protected instance: AxiosInstance
  protected requestInterceptor: number
  protected responseInterceptor: number
  protected cancelTokenSource: CancelTokenSource

  constructor(config: AxiosRequestConfig) {
    this.cancelTokenSource = axios.CancelToken.source()
    this.instance = axios.create({
      ...config,
      cancelToken: this.cancelTokenSource.token,
    })
    this.requestInterceptor = this.initializeRequestInterceptor()
    this.responseInterceptor = this.initializeResponseInterceptor()
  }

  protected abstract initializeRequestInterceptor(): number
  protected abstract initializeResponseInterceptor(): number

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, config) as Promise<T>
  }

  public async post<T>(url: string, data?: Recordable, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(url, data, config) as Promise<T>
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<T>(config) as Promise<T>
  }

  public async upload<T>(url: string, file: File, config?: AxiosRequestConfig): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    return this.instance.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    }) as Promise<T>
  }
}

export default BaseHttpClient
