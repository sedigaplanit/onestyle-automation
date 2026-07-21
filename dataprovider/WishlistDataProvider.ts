import WishlistApiClient from '@api/wishlist/WishlistApiClient'

export default class WishlistDataProvider {
  constructor(private readonly client: WishlistApiClient) {}

  /**
   * Ensures the product is in the wishlist.
   * Idempotent — checks first; adds only if absent.
   */
  async ensureInWishlist(productId: number): Promise<void> {
    const res = await this.client.getWishlist()
    const alreadyAdded = res.data.wishlist.some((item) => item.product_id === productId)
    if (!alreadyAdded) {
      await this.client.addToWishlist(productId)
    }
  }

  async clearWishlist(): Promise<void> {
    await this.client.clearWishlist()
  }
}
