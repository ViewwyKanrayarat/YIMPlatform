import { defineStore } from "pinia"

export const useProducts = defineStore("products", {
  state: () => ({
    products: [] as unknown[],
  }),
    getters: {
    Products(state): unknown[] {
      return state.products
    },

  },
  actions: {
    async getProducts() {
      try {
        const res = await fetch("../../public/data/AppendixB.json")
        const data = await res.json()
        this.products = data
      } catch (e: any) {
        console.log(e);
    
      }
    },
  },
})
