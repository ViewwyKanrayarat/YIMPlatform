import { defineStore } from "pinia"
import type { State, Getters, Actions, productsFilterModel, ProductModel } from "../types/ProductsType"

export const useProducts = defineStore<"products", State, Getters, Actions>("products", {
  state: (): State => ({
    products: [],
    productById: {
      sku: 0,
      brand: "",
      name: "",
      pack_size: "",
      image_url: [],
      price: 0,
    },
  }),
  getters: {
    Products(state: State) {
      return state.products
    },
    ProductById(state: State) {
      return state.productById
    },
  },
  actions: {
    async getProducts(filter?: productsFilterModel) {
      try {
        const res = await fetch("/data/AppendixB.json")
        const data = await res.json()
        let items = data.product_items as ProductModel[]

        // ถ้ามี filter
        if (filter) {
          if (filter.keyword) {
            const text = filter.keyword.toLowerCase()
            items = items.filter((p) => p.name.toLowerCase().includes(text) || p.brand.toLowerCase().includes(text))
          }

          if (filter.min !== null) {
            console.log("filter.min", filter.min)

            items = items.filter((p) => p.price >= filter.min!)
          }

          if (filter.max !== null) {
            items = items.filter((p) => p.price <= filter.max!)
          }
        }
        // ใส่ค่าใน state
        this.products = items
      } catch (e) {
        console.error(e)
      }
    },
    async getProductById(sku: number) {
      try {
        const item = this.products.find((p: ProductModel) => {
          if (p.sku == sku) {
            return p
          }
        })
        if (item) {
          this.productById = item
        }
      } catch (e: any) {
        console.log(e)
      }
    },
  },
})
