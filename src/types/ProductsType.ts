import { type _GettersTree } from 'pinia';
export interface State {
  products: ProductModel[]
  productById: ProductModel
}

export interface Getters extends _GettersTree<State> {
  Products(state: State): ProductModel[]
  ProductById(state: State): ProductModel
}

export interface Actions {
  getProducts(filter?:productsFilterModel): Promise<void>
  getProductById(sku: number): void
}

export type ProductModel = {
  sku: number
  brand: string
  name: string
  pack_size: string
  image_url: string[]
  price: number
}

export type ProductState = {
  products: ProductModel[]
  productById: ProductModel | null
}

export type productsFilterModel = {
  keyword?: string;
  min?: number;
  max?: number;
};
