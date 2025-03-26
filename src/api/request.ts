import BaseHttpClient from '@rengar/axios'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useRouterHook } from '@/hooks'
import { useAuthStore } from '@/stores'
import router from '@/router'

function showErrorMessage(message: string) {
  window.$message.error(message)
}

class HttpClient extends BaseHttpClient {
  protected cancelTokenSource = axios.CancelToken.source()

  constructor(config: AxiosRequestConfig) {
    super({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      ...config,
    })
    this.instance.defaults.cancelToken = this.cancelTokenSource.token
  }

  protected initializeRequestInterceptor(): number {
    return this.instance.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore()
        if (authStore.user.token) {
          config.headers.Authorization = `Bearer ${authStore.user.token}`
        }
        // 在这里可以添加请求拦截逻辑
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  private handleUnauthorized(message: string = '未授权，请重新登录') {
    const { routerReplaceToLogin } = useRouterHook(false)
    // 取消所有正在进行的请求
    this.cancelTokenSource.cancel(message)
    // 创建新的cancelTokenSource用于后续请求
    this.cancelTokenSource = axios.CancelToken.source()
    this.instance.defaults.cancelToken = this.cancelTokenSource.token
    showErrorMessage(message)
    const authStore = useAuthStore()
    authStore.reset()
    routerReplaceToLogin(router.currentRoute.value.fullPath)

    return Promise.reject(new Error(message))
  }

  protected initializeResponseInterceptor(): number {
    return this.instance.interceptors.response.use(
      (response) => {
        if (response.status === 200 && response.data.code === '000000') {
          return response.data.data
        } else if (response.data.code === '401') {
          return this.handleUnauthorized()
        } else {
          showErrorMessage(response.data.msg || '请求失败')
          return Promise.reject(new Error(response.data.msg || '请求失败'))
        }
      },
      (error) => {
        if (error.response?.status === 401) {
          return this.handleUnauthorized()
        }
        showErrorMessage('请求失败')
        return Promise.reject(error)
      },
    )
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, config) as Promise<T>
  }

  public post<T>(url: string, data?: Recordable, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(url, data, config) as Promise<T>
  }

  public request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<T>(config) as Promise<T>
  }

  public upload<T>(url: string, file: File, config?: AxiosRequestConfig): Promise<T> {
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

const baseHttp = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 10,
})

export { baseHttp }
