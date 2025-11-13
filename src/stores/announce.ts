import { defineStore } from "pinia"
import type { State, Getters, Actions} from "../types/AnnounceType"

export const useAnnounce = defineStore<"announce", State, Getters, Actions>("announce", {
  state: (): State  => ({
    list: {
      config: {
        delivery_fee: {
          delivery_fee_amount: 0,
          minimum_cart_amount: 0,
        },
        promotion: {
          discount_code: "",
          discount_amount:0
        },
    }},
  }),
    getters: {
    List(state){
      return state.list
    },

  },
  actions: {
    async getAnnounce() {
      try {
        const res = await fetch("../../public/data/AppendixA.json")
        const data = await res.json()
        this.list = data
      } catch (e: any) {
        console.log(e);
    
      }
    },
  },
})
