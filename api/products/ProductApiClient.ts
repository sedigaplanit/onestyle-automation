import { type APIRequestContext } from '@playwright/test'
import { BaseApiClient } from '@api/BaseApiClient'
import { type FetchResponse, type QueryParams } from '@api/fetch-helpers'
import { type components, ApiPaths } from '@api/types/capital.schema'

export type Product = components['schemas']['Product']
export type Review = components['schemas']['Review']

export interface ProductQueryParams extends QueryParams {
  category?: 'women' | 'men' | 'kid'
  search?: string
  priceRange?: 'low' | 'medium' | 'high'
  sort?: 'price-asc' | 'price-desc' | 'name-asc'
}

export default class ProductApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request)
  }

  public async getProducts(
    params?: ProductQueryParams
  ): Promise<FetchResponse<{ products: Product[] }>> {
    return this.makeRequest<{ products: Product[] }, never>(ApiPaths.GetProducts, {
      method: 'GET',
      params,
    })
  }

  public async getNewCollections(): Promise<FetchResponse<{ products: Product[] }>> {
    return this.makeRequest<{ products: Product[] }, never>(ApiPaths.GetNewCollections, {
      method: 'GET',
    })
  }

  public async getPopular(): Promise<FetchResponse<{ products: Product[] }>> {
    return this.makeRequest<{ products: Product[] }, never>(ApiPaths.GetPopularProducts, {
      method: 'GET',
    })
  }

  public async getById(id: number): Promise<FetchResponse<{ product: Product }>> {
    return this.makeRequest<{ product: Product }, never>(
      ApiPaths.GetProductById.replace('{id}', String(id)),
      { method: 'GET' }
    )
  }

  public async getReviews(id: number): Promise<
    FetchResponse<{
      reviews: Review[]
      average_rating: number
      total_reviews: number
    }>
  > {
    return this.makeRequest(ApiPaths.GetProductReviews.replace('{id}', String(id)), {
      method: 'GET',
    })
  }
}
