import { type APIRequestContext } from '@playwright/test'
import { BaseApiClient } from '@api/BaseApiClient'
import { type FetchResponse } from '@api/fetch-helpers'
import { type components, ApiPaths } from '@api/types/capital.schema'

export type EventType = components['schemas']['EventType']

export interface TrackEventRequest {
  event: EventType
  page?: string
  productId?: number
  productName?: string
  category?: string
  userId?: number
  sessionId?: string
  meta?: { qty?: number; query?: string }
}

export default class EventsApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request)
  }

  public async trackEvent(data: TrackEventRequest): Promise<FetchResponse<null>> {
    return this.makeRequest<null, TrackEventRequest>(ApiPaths.TrackEvent, {
      method: 'POST',
      data,
    })
  }
}
