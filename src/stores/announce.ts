import { defineStore } from "pinia"

export const useAnnounce = defineStore('announce', {
  state: () => ({
    list: [] as unknown[],
    isLoading: false as boolean,
    error: null as string | null,
  }),
  actions: {
    async getAnnounce() {
      try {
        this.isLoading = true
        const res = await fetch("/AppendixA.json") // ชี้ไป public root
        const data = await res.json()
        this.list = data
      } catch (e: any) {
        this.error = e?.message ?? "Failed to load announce"
      } finally {
        this.isLoading = false
      }
    },
  },
})