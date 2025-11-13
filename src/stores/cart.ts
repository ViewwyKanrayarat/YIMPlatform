import { defineStore } from "pinia"
import type { State, Getters, Actions, CartModel } from "../types/CartType"

export const useCart = defineStore<"cart", State, Getters, Actions>("cart", {
  state: (): State => ({
    cart: [],
    config: null,
    promotionDiscount: 0, // ยอดส่วนลด
    totalPayable: 0,
  }),
  getters: {
    Cart(state: State) {
      return state.cart
    },
    // จำนวนสินค้าในตระกร้า
    TotalItems(state): number {
      return state.cart.reduce((sum, item) => sum + item.amount, 0)
    },
    // ราคารวมในตะกร้า
    TotalPrice(state): number {
      return state.cart.reduce((sum, item) => sum + item.price * item.amount, 0)
    },
    // ค่าจัดส่ง
    DeliveryFee(state): number {
      return state.config?.config.delivery_fee.delivery_fee_amount ?? 0
    },
    // ส่วนลดค่าจัดส่ง ***เมื่อกรอกโค้ดแล้ว***
    PromotionDiscount(state): number {
      return state.promotionDiscount
    },
    // โค้ดส่วนลด
    PromotionCode(state): string {
      return state.config?.config.promotion.discount_code ?? ""
    },
    // ยอดขั้นต่ํา
    minimumCartAmount(state): number {
      return state.config?.config.delivery_fee.minimum_cart_amount ?? 0
    },
    // ยอดรวมที่ต้องชําระ
    TotalPayable(): number {
      return this.TotalPrice + this.DeliveryFee - this.PromotionDiscount
    },
  },
  actions: {
    async loadConfig() {
      try {
        const res = await fetch("/data/AppendixA.json")
        const data = await res.json()
        this.config = data
      } catch (err: any) {
        console.log(err)
        this.config = null
      }
    },
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
    calPromotionDiscount(code: string) {
      const userInput = code.trim().toLowerCase()
      const discountCode = this.PromotionCode.toLowerCase()
      if (userInput === discountCode && this.TotalPrice >= this.minimumCartAmount) {
        this.promotionDiscount = this.DeliveryFee
      } else {
        this.promotionDiscount = 0
      }
    },
  },
})
