import { type APIRequestContext } from '@playwright/test'
import { BaseApiClient } from '@api/BaseApiClient'
import { type FetchResponse } from '@api/fetch-helpers'
import { type components, ApiPaths } from '@api/types/capital.schema'

export type CartItems = components['schemas']['CartItems']

export default class CartApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request)
  }

  public async getCart(): Promise<FetchResponse<{ cartItems: CartItems }>> {
    return this.makeRequest<{ cartItems: CartItems }, never>(ApiPaths.GetCart, {
      method: 'GET',
    })
  }

  /** Replaces the entire cart with the provided items map. */
  public async saveCart(cartItems: CartItems): Promise<FetchResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }, { cartItems: CartItems }>(ApiPaths.SaveCart, {
      method: 'PUT',
      data: { cartItems },
    })
  }

  public async clearCart(): Promise<FetchResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }, never>(ApiPaths.ClearCart, {
      method: 'DELETE',
    })
  }
}
