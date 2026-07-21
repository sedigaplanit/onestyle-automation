import { type APIRequestContext, type APIResponse } from '@playwright/test'

export type QueryParams = Record<string, string | number | boolean | undefined>

/** Configuration for making requests: base URL and default headers. */
export interface FetchConfig {
  baseURL: string
  headers: Record<string, string>
}

/** Typed response wrapper returned by every API call. */
export interface FetchResponse<T = unknown> {
  status: number
  statusText: string
  data: T
  headers: Record<string, string>
}

/** Per-request options (method, headers, JSON body, query params). */
export interface FetchOptions<T = unknown> {
  method?: string
  headers?: Record<string, string>
  data?: T
  params?: QueryParams
}

const RETRYABLE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])
const RETRYABLE_ERROR_PATTERNS = [
  'ECONNRESET',
  'ETIMEDOUT',
  'ECONNREFUSED',
  'EAI_AGAIN',
  'socket hang up',
]
const MAX_RETRIES = 2
const RETRY_BACKOFF_MS = 300

function isRetryableNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  const msg = error.message.toLowerCase()
  return RETRYABLE_ERROR_PATTERNS.some((p) => msg.includes(p.toLowerCase()))
}

async function backoff(attempt: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, RETRY_BACKOFF_MS * attempt))
}

/**
 * Performs a typed HTTP request via Playwright's APIRequestContext.
 * Retries transient network errors for idempotent methods (GET/HEAD/OPTIONS).
 */
export async function fetchWithConfig<T, D>(
  request: APIRequestContext,
  url: string,
  options: FetchOptions<D> = {}
): Promise<FetchResponse<T>> {
  const { method = 'GET', headers = {}, data, params } = options

  const urlObj = new URL(url)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) urlObj.searchParams.append(key, String(value))
    }
  }

  const requestBody = data !== undefined ? JSON.stringify(data) : undefined
  const requestMethod = method.toUpperCase()
  let lastError: Error | undefined
  let response: APIResponse | undefined

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    try {
      response = await request.fetch(urlObj.toString(), {
        method,
        headers,
        data: requestBody,
      })
      break
    } catch (error) {
      if (
        !RETRYABLE_METHODS.has(requestMethod) ||
        !isRetryableNetworkError(error) ||
        attempt > MAX_RETRIES
      ) {
        throw error
      }
      lastError = error as Error
      await backoff(attempt)
    }
  }

  if (!response) {
    throw lastError ?? new Error('Request failed without a response')
  }

  const responseData = (await response.json().catch(() => null)) as T
  return {
    status: response.status(),
    statusText: response.statusText(),
    data: responseData,
    headers: response.headers(),
  }
}
