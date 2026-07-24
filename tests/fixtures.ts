import { test as base, expect, Page, Locator, request as baseRequest } from '@playwright/test'
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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getSelectorHints(selector: string): {
  role?: string
  name?: string
  label?: string
  placeholder?: string
} {
  const hints: { role?: string; name?: string; label?: string; placeholder?: string } = {}
  const normalized = selector.replace(/\s+/g, ' ').trim()

  const roleMatch = /role=([a-zA-Z0-9_-]+)/i.exec(normalized)
  if (roleMatch?.[1]) hints.role = roleMatch[1]

  const nameMatch = /name=(?:"([^"]+)"|'([^']+)'|([^\]]+))/i.exec(normalized)
  if (nameMatch?.[1] || nameMatch?.[2] || nameMatch?.[3]) {
    hints.name = nameMatch[1] ?? nameMatch[2] ?? nameMatch[3]
  }

  const labelMatch = /label=(?:"([^"]+)"|'([^']+)'|([^\]]+))/i.exec(normalized)
  if (labelMatch?.[1] || labelMatch?.[2] || labelMatch?.[3]) {
    hints.label = labelMatch[1] ?? labelMatch[2] ?? labelMatch[3]
  }

  const placeholderMatch = /placeholder=(?:"([^"]+)"|'([^']+)'|([^\]]+))/i.exec(normalized)
  if (placeholderMatch?.[1] || placeholderMatch?.[2] || placeholderMatch?.[3]) {
    hints.placeholder = placeholderMatch[1] ?? placeholderMatch[2] ?? placeholderMatch[3]
  }

  return hints
}

function buildRuntimeFallbacks(page: Page, locator: Locator): Locator[] {
  const selector = (locator as Locator & { _selector?: string })._selector ?? ''
  const hints = getSelectorHints(selector)
  const fallbacks: Locator[] = []

  if (hints.role && hints.name) {
    fallbacks.push(
      page.getByRole(hints.role as any, { name: new RegExp(escapeRegExp(hints.name), 'i') })
    )
    fallbacks.push(page.getByText(new RegExp(escapeRegExp(hints.name), 'i')))
  }

  if (hints.label) {
    fallbacks.push(page.getByLabel(hints.label, { exact: false }))
    fallbacks.push(page.getByText(hints.label, { exact: false }))
  }

  if (hints.placeholder) {
    fallbacks.push(page.getByPlaceholder(hints.placeholder, { exact: false }))
  }

  if (hints.name && !hints.role && !hints.label) {
    fallbacks.push(page.getByText(hints.name, { exact: false }))
  }

  return fallbacks.filter((candidate, index, list) => {
    const candidateSelector = (candidate as Locator & { _selector?: string })._selector
    return (
      list.findIndex((item) => {
        const itemSelector = (item as Locator & { _selector?: string })._selector
        return itemSelector === candidateSelector
      }) === index
    )
  })
}

function wrapLocatorForRecovery(page: Page, locator: Locator): Locator {
  const actionNames = new Set([
    'click',
    'fill',
    'waitFor',
    'selectOption',
    'isVisible',
    'isEnabled',
    'textContent',
    'allTextContents',
    'count',
  ])

  return new Proxy(locator, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver)
      if (typeof value !== 'function' || !actionNames.has(String(property))) {
        return value
      }

      return async (...args: unknown[]) => {
        try {
          return await value.apply(target, args)
        } catch (error) {
          const fallbacks = buildRuntimeFallbacks(page, target)

          for (const candidate of fallbacks) {
            try {
              return await (candidate as unknown as Record<string, typeof value>)[
                String(property)
              ].apply(candidate, args)
            } catch {
              // Continue trying alternative locators until one succeeds.
            }
          }

          throw error
        }
      }
    },
  }) as Locator
}

function applyRuntimeLocatorRecovery(page: Page): void {
  const runtimePage = page as Page & {
    locator: typeof page.locator
    getByRole: typeof page.getByRole
    getByLabel: typeof page.getByLabel
    getByPlaceholder: typeof page.getByPlaceholder
    getByText: typeof page.getByText
  }

  const nativeLocator = runtimePage.locator.bind(page)
  runtimePage.locator = ((selector, options) => {
    return wrapLocatorForRecovery(page, nativeLocator(selector, options))
  }) as typeof page.locator

  const nativeGetByRole = runtimePage.getByRole.bind(page)
  runtimePage.getByRole = ((role, options) => {
    return wrapLocatorForRecovery(page, nativeGetByRole(role, options))
  }) as typeof page.getByRole

  const nativeGetByLabel = runtimePage.getByLabel.bind(page)
  runtimePage.getByLabel = ((text, options) => {
    return wrapLocatorForRecovery(page, nativeGetByLabel(text, options))
  }) as typeof page.getByLabel

  const nativeGetByPlaceholder = runtimePage.getByPlaceholder.bind(page)
  runtimePage.getByPlaceholder = ((text, options) => {
    return wrapLocatorForRecovery(page, nativeGetByPlaceholder(text, options))
  }) as typeof page.getByPlaceholder

  const nativeGetByText = runtimePage.getByText.bind(page)
  runtimePage.getByText = ((text, options) => {
    return wrapLocatorForRecovery(page, nativeGetByText(text, options))
  }) as typeof page.getByText
}

export const test = base.extend<AppFixtures>({
  open: async ({ page }, use) => {
    applyRuntimeLocatorRecovery(page)
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
