import { type _GettersTree } from 'pinia';
import type { ProductModel } from './ProductsType';
export interface State {
  cart: CartModel[]
}

export interface Getters extends _GettersTree<State> {
  Cart(state: State): CartModel[]
  TotalItems(state: State): void
  TotalPrice(state: State): void
}

export interface Actions {
  getProductsInCart(product: CartModel): void
  removeProduct(sku: number): void
}

export type CartModel = ProductModel & {
  amount: number
}