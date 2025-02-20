import BaseHttpClient from '@renger/axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

class HttpClient extends BaseHttpClient {
  protected cancelTokenSource = axios.CancelToken.source()

  constructor(config: AxiosRequestConfig) {
    super({
      baseURL: config.baseURL || 'http://localhost:3000',
      timeout: config.timeout || 10000,
      ...config
    })
    this.instance.defaults.cancelToken = this.cancelTokenSource.token
  }

  protected initializeRequestInterceptor(): number {
    return this.instance.interceptors.request.use(
      (config) => {
        // 在这里可以添加请求拦截逻辑
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  protected initializeResponseInterceptor(): number {
    return this.instance.interceptors.response.use(
      (response) => {
        if (response.status === 200 && response.data.code === '000000') {
          return response.data.data
        } else if (response.data.code === '401') {
          this.instance.interceptors.request.eject(this.requestInterceptor)
          this.instance.interceptors.response.eject(this.responseInterceptor)
          this.cancelTokenSource.cancel('未授权，请重新登录')
          return Promise.reject(new Error('未授权，请重新登录'))
        } else {
          return Promise.reject(new Error(response.data.msg || '请求失败'))
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config)
  }

  public post<T>(url: string, data?: Recordable, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config)
  }

  public request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(config)
  }

  public upload<T>(url: string, file: File, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.instance.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
  }
}

export default HttpClient
