import { defineStore } from "pinia"
import type { State, Getters, Actions, CartModel } from "../types/CartType"

export const useCart = defineStore<"cart", State, Getters, Actions>("cart", {
  state: (): State => ({
    cart: [],
  }),
  getters: {
    Cart(state: State) {
      return state.cart
    },
    TotalItems(state): number {
      return state.cart.reduce((sum, item) => sum + item.amount, 0)
    },
    TotalPrice(state): number {
      return state.cart.reduce((sum, item) => sum + item.price * item.amount, 0)
    },
  },
  actions: {
    getProductsInCart(product: CartModel) {
      const found = this.cart.find((item) => item.sku === product.sku)
      if (found) {
        found.amount++
      } else {
        this.cart.push({
          ...product,
          amount: 1,
        })
      }
    },
    removeProduct(sku: number) {
      this.cart = this.cart.filter((item) => item.sku !== sku)
    },
  },
})
