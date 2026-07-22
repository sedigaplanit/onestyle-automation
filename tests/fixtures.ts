import { test as base, expect, Page, request as baseRequest } from '@playwright/test'
import BasePage from '@pages/BasePage'
import AuthApiClient from '@api/auth/AuthApiClient'
import CartApiClient from '@api/cart/CartApiClient'
import ProductApiClient from '@api/products/ProductApiClient'
import WishlistApiClient from '@api/wishlist/WishlistApiClient'
import OrdersApiClient from '@api/orders/OrdersApiClient'
import ReviewsApiClient from '@api/reviews/ReviewsApiClient'
import EventsApiClient from '@api/events/EventsApiClient'

type OpenFn = <T extends BasePage>(PageClass: new (page: Page) => T) => Promise<T>

export interface ApiContext {
  auth: AuthApiClient
  cart: CartApiClient
  products: ProductApiClient
  wishlist: WishlistApiClient
  orders: OrdersApiClient
  reviews: ReviewsApiClient
  events: EventsApiClient
}

type AppFixtures = {
  open: OpenFn
  apiContext: ApiContext
}

export const test = base.extend<AppFixtures>({
  open: async ({ page }, use) => {
    const open: OpenFn = (PageClass) => new PageClass(page).init()
    await use(open)
  },

  apiContext: async ({}, use) => {
    const requestContext = await baseRequest.newContext()

    const browser = process.env.BROWSER?.toUpperCase()
    const email = (browser && process.env[`USER_NAME_${browser}`]) || process.env.USER_NAME
    const password = (browser && process.env[`PASSWORD_${browser}`]) || process.env.PASSWORD
    if (!email || !password) {
      throw new Error('USER_NAME and PASSWORD must be set in .env')
    }

    const authClient = new AuthApiClient(requestContext)
    const loginRes = await authClient.login({ email, password })
    if (loginRes.status !== 200) {
      throw new Error(`API login failed: ${loginRes.status} ${loginRes.statusText}`)
    }
    const token = loginRes.data.token
    authClient.authorise(token)

    await use({
      auth: authClient,
      cart: new CartApiClient(requestContext).authorise(token),
      products: new ProductApiClient(requestContext),
      wishlist: new WishlistApiClient(requestContext).authorise(token),
      orders: new OrdersApiClient(requestContext).authorise(token),
      reviews: new ReviewsApiClient(requestContext).authorise(token),
      events: new EventsApiClient(requestContext),
    })

    await requestContext.dispose()
  },
})

export { expect }
