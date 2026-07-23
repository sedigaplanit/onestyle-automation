import { type APIRequestContext } from '@playwright/test'
import { BaseApiClient } from '@api/BaseApiClient'
import { type FetchResponse } from '@api/fetch-helpers'
import { type components, ApiPaths } from '@api/types/capital.schema'

export type User = components['schemas']['User']
export type AuthResponse = components['schemas']['AuthResponse']

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
  gender?: string
  mobile?: string
  address?: string
}

export interface UpdateProfileRequest {
  name: string
  gender?: string
  mobile?: string
  address?: string
}

// Render can cold-start the auth service, so login requests need more time than the default.
const LOGIN_REQUEST_TIMEOUT_MS = 30_000

export default class AuthApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request)
  }

  public async login(data: LoginRequest): Promise<FetchResponse<AuthResponse>> {
    return this.makeRequest<AuthResponse, LoginRequest>(ApiPaths.Login, {
      method: 'POST',
      data,
      timeout: LOGIN_REQUEST_TIMEOUT_MS,
    })
  }

  public async signup(data: SignupRequest): Promise<FetchResponse<AuthResponse>> {
    return this.makeRequest<AuthResponse, SignupRequest>(ApiPaths.Signup, {
      method: 'POST',
      data,
    })
  }

  public async getMe(): Promise<FetchResponse<{ user: User }>> {
    return this.makeRequest<{ user: User }, never>(ApiPaths.GetMe, {
      method: 'GET',
    })
  }

  public async updateProfile(data: UpdateProfileRequest): Promise<FetchResponse<AuthResponse>> {
    return this.makeRequest<AuthResponse, UpdateProfileRequest>(ApiPaths.UpdateProfile, {
      method: 'PUT',
      data,
    })
  }

  public async logout(): Promise<FetchResponse<{ message: string }>> {
    return this.makeRequest<{ message: string }, never>(ApiPaths.Logout, {
      method: 'POST',
    })
  }
}
