import { type APIRequestContext } from '@playwright/test'
import {
  fetchWithConfig,
  type FetchConfig,
  type FetchOptions,
  type FetchResponse,
} from '@api/fetch-helpers'

const BASE_URL: string =
  process.env.API_URL ??
  (() => {
    throw new Error('API_URL is not defined in the .env file.')
  })()

export type RequestParams<TData = unknown> = Omit<FetchOptions<TData>, 'data'> & {
  data?: TData
}

export class BaseApiClient {
  protected request: APIRequestContext
  protected config: FetchConfig

  constructor(
    request: APIRequestContext,
    config: FetchConfig = {
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: '',
      },
    }
  ) {
    this.request = request
    this.config = config
  }

  /** Sets the Bearer token on this client instance and returns it for chaining. */
  public authorise(token: string): this {
    this.config = {
      ...this.config,
      headers: {
        ...this.config.headers,
        Authorization: `Bearer ${token}`,
      },
    }
    return this
  }

  protected async makeRequest<T, D>(
    endpoint: string,
    options: RequestParams<D> = {}
  ): Promise<FetchResponse<T>> {
    const url = new URL(endpoint, this.config.baseURL).toString()
    return fetchWithConfig<T, D>(this.request, url, {
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    })
  }
}
