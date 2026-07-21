import OrdersApiClient, { type CreateOrderRequest } from '@api/orders/OrdersApiClient'
import { type Product } from '@api/products/ProductApiClient'

function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ORD-${date}-${suffix}`
}

export default class OrdersDataProvider {
  constructor(private readonly client: OrdersApiClient) {}

  /**
   * Creates a single-item order for the given product.
   * Returns the generated order ID string.
   */
  async seedOrder(product: Product): Promise<string> {
    const orderId = generateOrderId()
    const order: CreateOrderRequest = {
      id: orderId,
      date: new Date().toISOString(),
      total: product.new_price,
      items: [
        {
          id: product.id,
          name: product.name,
          image: product.image_url,
          price: product.new_price,
          quantity: 1,
        },
      ],
    }
    await this.client.createOrder(order)
    return orderId
  }
}
