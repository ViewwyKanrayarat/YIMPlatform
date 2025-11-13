import { type _GettersTree } from "pinia"
import type { ProductModel } from "./ProductsType"
export interface State {
  cart: CartModel[]
  config: AppConfig | null
  promotionDiscount: number
  totalPayable: number
}

export interface Getters extends _GettersTree<State> {
  Cart(state: State): CartModel[]
  TotalItems(state: State): void
  TotalPrice(state: State): void
  
}

export interface Actions {
  loadConfig(): void
  getProductsInCart(product: CartModel): void
  removeProduct(sku: number): void
  calPromotionDiscount(code:string): void
  resetCart(): void
}

export type CartModel = ProductModel & {
  amount: number
}

export type AppConfig = {
  config: {
    delivery_fee: deliveryFee;
    promotion: promotionModel;
  }
}

export type promotionModel = {
  discount_code: string
  discount_amount: number
}

export type deliveryFee = {
  delivery_fee_amount: number
  minimum_cart_amount: number
}