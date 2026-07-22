import ProductApiClient, {
  type Product,
  type ProductQueryParams,
} from '@api/products/ProductApiClient'

export default class ProductDataProvider {
  constructor(private readonly client: ProductApiClient) {}

  /** Returns the first product from the full catalogue. */
  async getFirstProduct(): Promise<Product> {
    const res = await this.client.getProducts()
    const products = res.data.products
    if (!products.length) throw new Error('No products returned from the API')
    return products[0]
  }

  /** Returns all products matching the given category. */
  async getProductsByCategory(category: ProductQueryParams['category']): Promise<Product[]> {
    const res = await this.client.getProducts({ category })
    return res.data.products
  }
}
