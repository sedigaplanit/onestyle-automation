import { type APIRequestContext } from '@playwright/test'
import { BaseApiClient } from '@api/BaseApiClient'
import { type FetchResponse } from '@api/fetch-helpers'
import { type components, ApiPaths } from '@api/types/capital.schema'

export type WishlistItem = components['schemas']['WishlistItem']

export default class WishlistApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request)
  }

  public async getWishlist(): Promise<FetchResponse<{ wishlist: WishlistItem[] }>> {
    return this.makeRequest<{ wishlist: WishlistItem[] }, never>(ApiPaths.GetWishlist, {
      method: 'GET',
    })
  }

  public async addToWishlist(productId: number): Promise<FetchResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }, never>(
      ApiPaths.AddToWishlist.replace('{productId}', String(productId)),
      { method: 'POST' }
    )
  }

  public async removeFromWishlist(productId: number): Promise<FetchResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }, never>(
      ApiPaths.RemoveFromWishlist.replace('{productId}', String(productId)),
      { method: 'DELETE' }
    )
  }

  public async clearWishlist(): Promise<FetchResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }, never>(ApiPaths.ClearWishlist, {
      method: 'DELETE',
    })
  }
}
