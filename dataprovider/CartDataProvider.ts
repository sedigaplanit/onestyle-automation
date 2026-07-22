import CartApiClient, { type CartItems } from '@api/cart/CartApiClient'

export default class CartDataProvider {
  constructor(private readonly client: CartApiClient) {}

  /** Replaces the entire cart with the given items map. */
  async seedCart(cartItems: CartItems): Promise<void> {
    await this.client.saveCart(cartItems)
  }

  /** Seeds a single product with the given quantity. */
  async addSingleProduct(productId: number, qty: number = 1): Promise<void> {
    await this.client.saveCart({ [String(productId)]: qty })
  }

  async clearCart(): Promise<void> {
    await this.client.clearCart()
  }
}
