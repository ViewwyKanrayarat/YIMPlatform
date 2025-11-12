import { type _GettersTree } from 'pinia';
import type { ProductModel } from './ProductsType';
export interface State {
  cart: CartModel[]
}

export interface Getters extends _GettersTree<State> {
  Cart(state: State): CartModel[]
}

export interface Actions {
  getProductsInCart(product: CartModel): void
}

export type CartModel = ProductModel & {
  amount: number
}