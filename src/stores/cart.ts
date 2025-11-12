import { defineStore } from "pinia"
import type { ProductModel } from "../types/ProductsType"
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
      // หาสินค้าใน cart เดิม
      const found = this.cart.find((item) => item.sku === product.sku)

      // สินค้าซ้ำจะเพิ่มจำนวน
      if (found) {
        found.amount++
      } else {
        // ไม่ซ้ำจะ push ไปใหม่
        this.cart.push({
          ...product,
          amount: 1,
        })
      }
      console.log("add success", this.cart)
      console.log("test", this.TotalItems)
    },
  },
})
