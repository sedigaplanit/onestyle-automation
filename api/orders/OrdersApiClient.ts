import { type APIRequestContext } from '@playwright/test'
import { BaseApiClient } from '@api/BaseApiClient'
import { type FetchResponse } from '@api/fetch-helpers'
import { type components, ApiPaths } from '@api/types/capital.schema'

export type Order = components['schemas']['Order']
export type OrderItem = components['schemas']['OrderItem']

export interface CreateOrderRequest {
  id: string
  date?: string
  total: number
  items: OrderItem[]
}

export default class OrdersApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request)
  }

  public async getOrders(): Promise<FetchResponse<{ orders: Order[] }>> {
    return this.makeRequest<{ orders: Order[] }, never>(ApiPaths.GetOrders, {
      method: 'GET',
    })
  }

  public async createOrder(
    order: CreateOrderRequest
  ): Promise<FetchResponse<{ message: string; orderId: number }>> {
    return this.makeRequest<{ message: string; orderId: number }, CreateOrderRequest>(
      ApiPaths.CreateOrder,
      { method: 'POST', data: order }
    )
  }
}
