import { defineStore } from "pinia"

export const useProducts = defineStore("products", {
  state: () => ({
    products: [] as unknown[],
    productById: null as any,
  }),
  getters: {
    Products(state): unknown[] {
      return state.products
    },
    ProductById(state): unknown[] {
      return state.productById
    },
  },
  actions: {
    async getProducts() {
      try {
        const res = await fetch("../../public/data/AppendixB.json")
        const data = await res.json()
        this.products = data.product_items
      } catch (e: any) {
        console.log(e)
      }
    },
    async getProductById(sku) {
      try {
        const item = this.products.find((p: any) => {
          if (p.sku == sku) {
            return p
          }
        })
        this.productById = item
      } catch (e: any) {
        console.log(e)
      }
    },
  },
})
