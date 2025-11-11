import { defineStore } from "pinia"

export const useAnnounce = defineStore("announce", {
  state: () => ({
    list: [] as unknown[],
  }),
    getters: {
    List(state): unknown[] {
      return state.list
    },

  },
  actions: {
    async getAnnounce() {
      try {
        const res = await fetch("../../public/data/AppendixA.json")
        const data = await res.json()
        this.list = data
        // console.log("this.list", this.list)
      } catch (e: any) {
        console.log(e);
    
      }
    },
  },
})
