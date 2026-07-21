import { type APIRequestContext } from '@playwright/test'
import { BaseApiClient } from '@api/BaseApiClient'
import { type FetchResponse } from '@api/fetch-helpers'
import { type components, ApiPaths } from '@api/types/capital.schema'

export type Review = components['schemas']['Review']

export interface SubmitReviewRequest {
  productId: number
  rating: number
  comment?: string
}

export default class ReviewsApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request)
  }

  public async submitReview(data: SubmitReviewRequest): Promise<FetchResponse<{ review: Review }>> {
    return this.makeRequest<{ review: Review }, SubmitReviewRequest>(ApiPaths.SubmitReview, {
      method: 'POST',
      data,
    })
  }

  public async deleteReview(reviewId: number): Promise<FetchResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }, never>(
      ApiPaths.DeleteReview.replace('{reviewId}', String(reviewId)),
      { method: 'DELETE' }
    )
  }
}
